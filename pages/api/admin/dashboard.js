import { getAllOrders } from '~/lib/order';

export default async function handler(req, res) {
  let logs = [];
  const orders = await getAllOrders();
  logs.push(orders.log);
  res.json({
    orders,
    logs,
    status: 200
  });
}
