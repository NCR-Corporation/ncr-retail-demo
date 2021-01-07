import { getOrderById, updateOrderById } from '~/lib/order';
import { getSession } from 'next-auth/client';

let logs = [];

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const session = await getSession({ req });
    let data = await getOrderById(req.query.id);
    logs.push(data.log);
    if (data.data.customer.id != session.user.username) {
      res.json({ error: 403, logs });
    } else {
      res.json({ data, logs });
    }
  } else {
    // Post request.
    let body = JSON.parse(req.body);
    let data = await updateOrderById(body.siteId, body.orderId, body.values);
    logs.push(data);
    res.json({ data, logs });
  }
}
