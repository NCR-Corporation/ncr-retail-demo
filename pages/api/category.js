import { getAllCategoryNodes } from '../../lib/category';

export default async function handler(req, res) {
  const categories = await getAllCategoryNodes();
  res.json(categories);
}