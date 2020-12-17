import { getAllGroups } from '~/lib/groups';

export default async function handler(req, res) {
  let result = await getAllGroups();
  res.json(result);
}
