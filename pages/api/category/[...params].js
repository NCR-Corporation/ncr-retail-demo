import { getCategoriesByParentId, getCategoryById } from '~/lib/category';
import { getSiteCatelogItemsByMerchandiseCategoryId } from '~/lib/catalog';
import _ from 'lodash';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let categoryId = req.query.params[1];
  let categoryItems = await getSiteCatelogItemsByMerchandiseCategoryId(
    siteId,
    categoryId
  );
  let category = await getCategoryById(categoryId);
  let childrenCategories = await getCategoriesByParentId(categoryId);
  if (
    categoryItems.data &&
    categoryItems.data.pageContent.length == 0 &&
    childrenCategories.data.pageContent.length > 0
  ) {
    let childCategoryItems = [];
    const promises = childrenCategories.data.pageContent.map(
      async (category) => {
        let childCategoryItem = await getSiteCatelogItemsByMerchandiseCategoryId(
          siteId,
          category.nodeCode
        );
        if (childCategoryItem.data) {
          childCategoryItems = childCategoryItems.concat(
            childCategoryItem.data.pageContent
          );
        }
      }
    );
    await Promise.all(promises);
    categoryItems = childCategoryItems;
  } else {
    categoryItems = categoryItems.data.pageContent;
  }
  var sortByItemCode = function (obj) {
    return obj.item.itemId.itemCode;
  };
  categoryItems = _.sortBy(categoryItems, sortByItemCode);
  res.json({ status: 200, category, childrenCategories, categoryItems });
}
