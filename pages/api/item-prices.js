import { createCatalogPricesItem } from '~/lib/catalog';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let response = await createCatalogPricesItem(req.query.id, JSON.parse(req.body));
    res.status(response.status).json({ response, logs: [response.log] });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
