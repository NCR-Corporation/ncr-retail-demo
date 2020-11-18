import { getCatalogItemCategoryAncestorsByMerchandiseCategory, getCategoriesByParentId, getCategoryById, getCatelogItemsByMerchandiseCategoryId } from '../../../lib/category';

export default async function handler(req, res) {
  let categoryItems = await getCatelogItemsByMerchandiseCategoryId(req.query.params[0], req.query.params[1]);
  let category = await getCategoryById(req.query.params[0]);
  let childrenCategories = await getCategoriesByParentId(req.query.params[0]);
  // console.log(categoryItems);
  // console.log(childrenCategories);

  if (categoryItems.data.pageContent.length == 0 && childrenCategories.data.pageContent.length > 0) {
    let childCategoryItems = {};
    const promises = childrenCategories.data.pageContent.map(async category => {
      // console.log('category', category);
      let childCategoryItem = await getCatelogItemsByMerchandiseCategoryId(category.nodeCode, req.query.params[1]);
      // console.log(childCategoryItems);
      if (!childCategoryItem.data) {
        // Object.assign(childCategoryItems, )
        childCategoryItems = { ...childCategoryItem }
      }
    })
    await Promise.all(promises);
    // console.log(childCategoryItems);
    categoryItems = childCategoryItems;
  }
  res.json({ category, childrenCategories, categoryItems });
}