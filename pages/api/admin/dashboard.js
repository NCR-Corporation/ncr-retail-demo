import { getSites } from '~/lib/sites';
import { getAllCategoryNodes } from '~/lib/category';
import { getCatalogItems } from '~/lib/catalog';
import { getAllOrders } from '~/lib/order';

export default async function handler(req, res) {
  const sites = await getSites(true);
  const categoryNodes = await getAllCategoryNodes(true);
  const catalog = await getCatalogItems(true);
  const orders = await getAllOrders();
  res.json({
    sites,
    categoryNodes,
    catalog,
    orders,
  });
}
