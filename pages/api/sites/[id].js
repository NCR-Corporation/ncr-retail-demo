import { getById, updateSite } from '~/lib/sites';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getById(req.query.id);
    if (response.status !== 200) {
      res.status(response.status).json(response);
    }
    res.status(200).json({ response, logs: [response.log] });
  } else if (req.method === 'PUT') {
    let response = await updateSite(req.query.id, JSON.parse(req.body));
    if (response.status !== 200) {
      res.status(response.status).json(response);
    }
    res.status(200).json({ response, logs: [response.log] });
  }
}
