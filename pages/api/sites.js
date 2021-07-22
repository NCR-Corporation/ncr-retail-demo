import { createSite } from '~/lib/sites';

export default async function handler(req, res) {
  let response = await createSite(JSON.parse(req.body));
  res.status(response.status).json({ response, logs: [response.log] });
}
