import { getCategoriesByParentId, getCategoryById } from '~/lib/category';
import { getSiteCatelogItemsByMerchandiseCategoryId } from '~/lib/catalog';
import _ from 'lodash';

let logs = [];

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let categoryId = req.query.params[1];
  let categoryItems = await getSiteCatelogItemsByMerchandiseCategoryId(siteId, categoryId);
  if (categoryItems.status !== 200) {
    res.status(categoryItems).json(categoryItems);
  }
  let category = await getCategoryById(categoryId);
  if (category.status !== 200) {
    res.status(category).json(category);
  }
  let childrenCategories = await getCategoriesByParentId(categoryId);
  if (childrenCategories.status !== 200) {
    res.status(childrenCategories).json(childrenCategories);
  }
  logs.push(category.log);
  logs.push(categoryItems.log);
  logs.push(childrenCategories.log);
  if (categoryItems.data && categoryItems.data.pageContent.length == 0 && childrenCategories.data.pageContent.length > 0) {
    let childCategoryItems = [];
    const promises = childrenCategories.data.pageContent.map(async (category) => {
      let childCategoryItem = await getSiteCatelogItemsByMerchandiseCategoryId(siteId, category.nodeCode);
      if (childCategoryItem.status !== 200) {
        console.error(`${childCategoryItem.status}: ${JSON.stringify(childCategoryItem)}`);
      } else {
        logs.push(childCategoryItem.log);
        if (childCategoryItem.data) {
          childCategoryItems = childCategoryItems.concat(childCategoryItem.data.pageContent);
        }
      }
    });
    await Promise.all(promises);
    categoryItems = childCategoryItems;
  } else {
    categoryItems = categoryItems.data.pageContent;
  }
  var sortByItemCode = function (obj) {
    return obj.item.itemId.itemCode;
  };
  categoryItems = _.sortBy(categoryItems, sortByItemCode);
  res.status(200).json({ category, childrenCategories, categoryItems, logs });
}
