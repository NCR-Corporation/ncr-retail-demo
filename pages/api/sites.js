import { createSite } from '~/lib/sites';

export default async function handler(req, res) {
  console.log(req.body);
  let response = await createSite(JSON.parse(req.body));
  res.json(response);
}
