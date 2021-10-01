import { getCategoryById, updateCategory } from '~/lib/category';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getCategoryById(req.query.id);
    res.status(response.status).json({ response, logs: [response.log] });
  } else if (req.method === 'PUT') {
    let response = await updateCategory(JSON.parse(req.body));
    res.json({ response, logs: [response.log] });
  }
}
