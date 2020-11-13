import { createCatalogItem } from '../../lib/catalog';

export default async function handler(req, res) {
  let response = await createCatalogItem(req.body)
  res.json(response);
}