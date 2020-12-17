import { getAllOrders } from '~/lib/order';

export default async function handler(req, res) {
  let result = await getAllOrders();
  res.json(result);
}
