import { getCatalogItemByItemCode } from '~/lib/catalog';
let logs = [];

export default async function handler(req, res) {
  const catalogItem = await getCatalogItemByItemCode(req.query.id);
  logs.push(catalogItem.log);
  res.json({ catalogItem, logs });
}
