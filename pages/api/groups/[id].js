import { getGroupById } from '~/lib/groups';

export default async function handler(req, res) {
  let response = await getGroupById(req.query.id);
  res.json(response);
}
