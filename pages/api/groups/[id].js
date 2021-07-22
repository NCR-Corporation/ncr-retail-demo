import { getGroupById } from '~/lib/groups';

export default async function handler(req, res) {
  let response = await getGroupById(req.query.id);
  res.status(response.status).json({ response, logs: [response.log] });
}
