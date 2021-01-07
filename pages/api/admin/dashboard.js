import { getAllOrders } from '~/lib/order';
let logs = [];

export default async function handler(req, res) {
  const orders = await getAllOrders();
  logs.add(orders.log);
  res.json({
    orders,
    logs,
  });
}
