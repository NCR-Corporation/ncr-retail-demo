import { createSite } from '~/lib/sites';

export default async function handler(req, res) {
  let response = await createSite(JSON.parse(req.body));
  res.json(response);
}
