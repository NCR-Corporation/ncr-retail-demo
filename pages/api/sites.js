import { createSite } from '~/lib/sites';
let logs = [];

export default async function handler(req, res) {
  let response = await createSite(JSON.parse(req.body));
  logs.push(response.log);
  res.json({ response, logs, status: 200 });
}
