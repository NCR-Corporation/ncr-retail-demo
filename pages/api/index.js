import { getSiteCatelogItemsByMerchandiseCategoryId } from '~/lib/catalog';
import { getCategoriesByParentId } from '~/lib/category';

export default async function handler(req, res) {
  let homepage = await getCategoriesByParentId('Homepage');
  let homepageContent = {};
  const promises = homepage.data.pageContent.map(async (category) => {
    console.log('here', category);
    let catalogItems = await getSiteCatelogItemsByMerchandiseCategoryId(
      req.query.site,
      category.nodeCode
    );
    homepageContent[category.nodeCode] = {
      category,
      catalog: catalogItems,
    };
  });
  await Promise.all(promises);
  res.json({ homepageContent });
}
