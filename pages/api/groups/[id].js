import { getGroupById } from '~/lib/groups';
let logs = [];

export default async function handler(req, res) {
  let response = await getGroupById(req.query.id);
  logs.push(response.log);
  res.json({ response, logs, status: 200 });
}
