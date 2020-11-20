import { createCatalogItems } from '../../../lib/catalog';

export default async function handler(req, res) {
  let body = JSON.parse(req.body)
  let itemsBody = { "items": [body] };
  let response = await createCatalogItems(JSON.stringify(itemsBody))
  res.json(response);
}