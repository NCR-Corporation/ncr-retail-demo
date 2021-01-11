import { getOrderById, updateOrderById } from '~/lib/order';
import { getSession } from 'next-auth/client';

let logs = [];

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const session = await getSession({ req });
    let order = await getOrderById(req.query.id);
    logs.push(order.log);
    if (order.data.customer.id != session.user.username) {
      res.json({ status: 403, logs });
    } else {
      res.json({ order, logs, status: 200 });
    }
  } else {
    // Post request.
    let body = JSON.parse(req.body);
    let data = await updateOrderById(body.siteId, body.orderId, body.values);
    logs.push(data);
    res.json({ data, logs, status: 200 });
  }
}
