import { getAllCategoryNodes } from '~/lib/category';

let logs = [];

export default async function handler(req, res) {
  const categoryNodes = await getAllCategoryNodes(true);
  logs.push(categoryNodes.log);

  res.json({ categoryNodes, logs, status: 200 });
}
