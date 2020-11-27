import { getSiteCatalogItemDetailsByItemCode } from '~/lib/catalog';
import { getCatalogItemCategoryAncestorsByMerchandiseCategory } from '~/lib/category';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let itemCode = req.query.params[1];
  const catalogItem = await getSiteCatalogItemDetailsByItemCode(
    siteId,
    itemCode
  );
  const ancestors = await getCatalogItemCategoryAncestorsByMerchandiseCategory(
    catalogItem.data.item.merchandiseCategory.nodeId
  );
  catalogItem.data['categories'] = ancestors.data.nodes;

  res.json(catalogItem);
}
