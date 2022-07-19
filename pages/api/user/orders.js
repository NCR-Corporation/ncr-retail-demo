import { getOrdersByUser } from '~/lib/order';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  let data = await getOrdersByUser(session.user.username);
  res.status(200).json({ data, logs: [data.log] });
}
