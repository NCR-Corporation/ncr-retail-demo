import { createSite } from '../../lib/sites';

export default async function handler(req, res) {
  let response = await createSite(req.body)
  res.json({ message: 'hello' });
}