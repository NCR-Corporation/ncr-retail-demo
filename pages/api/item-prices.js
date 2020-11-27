import { createCatalogPricesItem } from '~/lib/catalog';

export default async function handler(req, res) {
  let response = await createCatalogPricesItem(req.query.id, req.body);
  res.json(response);
}
