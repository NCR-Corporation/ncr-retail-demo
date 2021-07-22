import { getCatalogItemByItemCode } from '~/lib/catalog';

export default async function handler(req, res) {
  const catalogItem = await getCatalogItemByItemCode(req.query.id);
  res.status(catalogItem.status).json({ catalogItem, logs: [catalogItem.log] });
}
