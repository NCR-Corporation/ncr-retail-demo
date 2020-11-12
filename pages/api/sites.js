import { createSite } from '../../lib/sites';

export default async function handler(req, res) {
  let response = await createSite(req.body)
  console.log('the response', response);
  res.json({ message: 'hello' });

}