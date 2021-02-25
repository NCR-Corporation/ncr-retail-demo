import { getOrdersByUser } from '~/lib/order';
import { getSession } from 'next-auth/client';

let logs = [];

export default async function handler(req, res) {
  const session = await getSession({ req });
  let data = await getOrdersByUser(session.user.username);
  logs.push(data.log);
  res.json({ data, logs, status: 200 });
}
