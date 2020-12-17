import { getCategoryById, updateCategory } from '~/lib/category';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await getCategoryById(req.query.id);
    res.json(response);
  } else if (req.method === 'PUT') {
    console.log(JSON.parse(req.body));
    let response = await updateCategory(JSON.parse(req.body));
    res.json(response);
  }
}
