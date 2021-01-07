import { getAllGroups } from '~/lib/groups';

let logs = [];

export default async function handler(req, res) {
  let result = await getAllGroups();
  logs.push(result.log);
  res.json({ result, logs });
}
