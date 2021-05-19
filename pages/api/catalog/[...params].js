import { getSiteCatalogItemDetailsByItemCode } from '~/lib/catalog';
import { getCatalogItemCategoryAncestorsByMerchandiseCategory } from '~/lib/category';
let logs = [];

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let itemCode = req.query.params[1];
  const catalogItem = await getSiteCatalogItemDetailsByItemCode(siteId, itemCode);
  logs.push(catalogItem.log);
  const ancestors = await getCatalogItemCategoryAncestorsByMerchandiseCategory(catalogItem.data.item.merchandiseCategory.nodeId);
  logs.push(ancestors.log);
  catalogItem.data['categories'] = ancestors.data ? ancestors.data.nodes : [];

  res.json({ catalogItem, logs, status: 200 });
}
