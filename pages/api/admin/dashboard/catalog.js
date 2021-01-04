import { getCatalogItems } from '~/lib/catalog';
import Logger from '~/lib/logger';

export default async function handler(req, res) {
  let logger = new Logger();
  const catalog = await getCatalogItems();
  logger.add(catalog.log);
  let logs = logger.log;
  logger.reset();
  res.json({ catalog, logs });
}
