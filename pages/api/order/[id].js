import { getOrderById } from '~/lib/order';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });
  let data = await getOrderById(req.query.id);
  if (data.data.customer.id != session.user.username) {
    res.json({ error: 403 });
  } else {
    console.log('here');
    res.json(data);
  }
}
