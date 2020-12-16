import { getOrderById } from '~/lib/order';

export default async function handler(req, res) {
  let response = await getOrderById(req.query.id);
  res.json(response);
}
