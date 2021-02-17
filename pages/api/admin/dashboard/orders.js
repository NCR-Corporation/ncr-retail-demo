import { getAllOrders } from '~/lib/order';
let logs = [];

export default async function handler(req, res) {
  let orders = await getAllOrders();
  logs.push(orders.log);
  res.json({ orders, logs, status: 200 });
}
