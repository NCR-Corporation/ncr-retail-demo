import { getCatalogItemByItemCode } from '../../../lib/catalog';

export default async function handler(req, res) {
  const catalogItem = await getCatalogItemByItemCode(req.query.id);
  res.json(catalogItem.data);
}