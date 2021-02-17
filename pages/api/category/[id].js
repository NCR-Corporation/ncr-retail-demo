import { getCategoryById, updateCategory } from '~/lib/category';
let logs = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getCategoryById(req.query.id);
    logs.push(response.log);
    res.json({ response, logs, status: 200 });
  } else if (req.method === 'PUT') {
    let response = await updateCategory(JSON.parse(req.body));
    logs.push(response.log);
    res.json({ response, logs, status: 200 });
  }
}
