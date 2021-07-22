import { getCategoryNodesForMenu } from '~/lib/category';

export default async function handler(req, res) {
  const { categories } = await getCategoryNodesForMenu();
  res.status(200).json({ categories });
}
