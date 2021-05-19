import { createCatalogPricesItem } from '~/lib/catalog';
let logs = [];

export default async function handler(req, res) {
  let response = await createCatalogPricesItem(req.query.id, JSON.parse(req.body));
  logs.push(response.log);
  res.json({ response, logs, status: 200 });
}
