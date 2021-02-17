import { getById, updateSite } from '~/lib/sites';
let logs = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getById(req.query.id);
    logs.push(response.log);
    res.json({ response, logs, status: 200 });
  } else if (req.method === 'PUT') {
    let response = await updateSite(req.query.id, JSON.parse(req.body));
    logs.push(response.log);
    res.json({ response, logs, status: 200 });
  }
}
