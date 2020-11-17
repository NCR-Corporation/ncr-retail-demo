import { getById } from '../../../lib/sites';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getById(req.query.id);
    res.json(response);
  } else {
    // let response = await createOrUpdateCatalogItem(req.query.id, req.body)
    // res.json(response);

  }
}