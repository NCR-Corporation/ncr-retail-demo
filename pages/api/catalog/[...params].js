import { getSiteCatalogItemDetailsByItemCode } from '~/lib/catalog';
import { getCatalogItemCategoryAncestorsByMerchandiseCategory } from '~/lib/category';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let itemCode = req.query.params[1];
  const catalogItem = await getSiteCatalogItemDetailsByItemCode(siteId, itemCode);
  if (catalogItem.status !== 200) {
    res.status(catalogItem.status).json(catalogItem);
  }
  const ancestors = await getCatalogItemCategoryAncestorsByMerchandiseCategory(catalogItem.data.item.merchandiseCategory.nodeId);
  if (ancestors.status !== 200) {
    res.status(ancestors.status).json(ancestors);
  }
  catalogItem.data['categories'] = ancestors.data ? ancestors.data.nodes : [];

  res.status(200).json({ catalogItem, logs: [catalogItem.log, ancestors.log] });
}
