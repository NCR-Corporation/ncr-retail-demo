import { getSites } from '~/lib/sites';
let logs = [];

export default async function handler(req, res) {
  const sites = await getSites(true);
  logs.push(sites.log);
  res.json({ sites, logs, status: 200 });
}
