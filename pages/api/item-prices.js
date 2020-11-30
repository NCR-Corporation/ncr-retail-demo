import { createCatalogPricesItem } from '~/lib/catalog';

export default async function handler(req, res) {
  let response = await createCatalogPricesItem(
    req.query.id,
    JSON.parse(req.body)
  );
  res.json(response);
}
