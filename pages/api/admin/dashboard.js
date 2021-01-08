import { getAllOrders } from '~/lib/order';

export default async function handler(req, res) {
  const orders = await getAllOrders();
  res.json(orders);
}
