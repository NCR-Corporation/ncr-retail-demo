import { getSites } from '~/lib/sites';
import Logger from '~/lib/logger';

export default async function handler(req, res) {
  let logger = new Logger();
  const sites = await getSites(true);
  logger.add(sites.log);
  let logs = logger.log;
  logger.reset();
  res.json({ sites, logs });
}
