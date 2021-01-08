import { createGroup } from '~/lib/groups';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);
    let result = await createGroup(body);
    res.json(result);
  }
}
