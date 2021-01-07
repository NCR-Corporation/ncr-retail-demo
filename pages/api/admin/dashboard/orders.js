import { getAllOrders } from '~/lib/order';
let logs = [];

export default async function handler(req, res) {
  let result = await getAllOrders();
  logs.push(result.log);
  res.json({ result, logs });
}
