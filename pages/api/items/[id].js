import { createOrUpdateCatalogItem } from '../../../lib/catalog';

export default async function handler(req, res) {
  let response = await createOrUpdateCatalogItem(req.query.id, req.body)
  res.json(response);
}