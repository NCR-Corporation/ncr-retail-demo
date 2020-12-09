import { getSites } from '~/lib/sites';

export default async function handler(req, res) {
  const sites = await getSites(true);
  res.json(sites);
}
