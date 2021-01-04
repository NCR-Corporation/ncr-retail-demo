import { getAllCategoryNodes } from '~/lib/category';
import Logger from '~/lib/logger';

export default async function handler(req, res) {
  let logger = new Logger();
  const categoryNodes = await getAllCategoryNodes(true);
  logger.add(categoryNodes.log);
  let logs = logger.log;
  logger.reset();

  res.json({ categoryNodes, logs });
}
