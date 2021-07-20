import { getAllGroups } from '~/lib/groups';

export default async function handler(_, res) {
  let result = await getAllGroups();
  res.status(result.status).json({ result, logs: [result.log] });
}
