import { getAllCategoryNodes } from '~/lib/category';

export default async function handler(req, res) {
  const categoryNodes = await getAllCategoryNodes(true);
  res.json(categoryNodes);
}
