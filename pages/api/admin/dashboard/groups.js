import { getAllGroups } from '~/lib/groups';
import Logger from '~/lib/logger';

export default async function handler(req, res) {
  let logger = new Logger();
  let result = await getAllGroups();
  logger.add(result.log);
  let logs = logger.log;
  logger.reset();
  res.json({ result, logs });
}
