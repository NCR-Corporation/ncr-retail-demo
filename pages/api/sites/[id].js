import { getById, updateSite } from '../../../lib/sites';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getById(req.query.id);
    res.json(response);
  } else if (req.method === 'PUT') {
    let response = await updateSite(req.query.id, req.body);
    res.json(response);
    // let response = await createOrUpdateCatalogItem(req.query.id, req.body)
    // res.json(response);

  }
}