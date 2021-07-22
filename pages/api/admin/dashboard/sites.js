import { getSites } from '~/lib/sites';

export default async function handler(_, res) {
  const sites = await getSites(true);
  res.status(sites.status).json({ sites, logs: [sites.log] });
}
