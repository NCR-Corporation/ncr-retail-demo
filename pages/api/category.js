import { getAllCategoryNodes, createCategory } from '../../lib/category';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const categories = await getAllCategoryNodes();
    res.json(categories);
  } else if (req.method === "PUT") {
    let response = await createCategory(req.body);
    res.json(response);
  }
}