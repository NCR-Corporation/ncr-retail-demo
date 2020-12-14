import { getSites } from '~/lib/sites';
import { getAllCategoryNodes } from '~/lib/category';
import { getCatalogItems } from '~/lib/catalog';

export default async function handler(req, res) {
  const sites = await getSites(true);
  const categoryNodes = await getAllCategoryNodes(true);
  const catalog = await getCatalogItems(true);
  res.json({
    sites,
    categoryNodes,
    catalog,
  });
}
