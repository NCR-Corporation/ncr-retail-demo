import { getAllOrders } from '~/lib/order';
import Logger from '~/lib/logger';

export default async function handler(req, res) {
  let logger = new Logger();
  const orders = await getAllOrders();
  logger.add(orders.log);
  let logs = logger.log;
  logger.reset();
  res.json({
    orders,
    logs,
  });
}
