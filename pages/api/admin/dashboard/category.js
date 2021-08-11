import { getAllCategoryNodes } from '~/lib/category';

export default async function handler(_, res) {
  const categoryNodes = await getAllCategoryNodes(true);
  res.json({ categoryNodes, logs: [categoryNodes.log] });
}
