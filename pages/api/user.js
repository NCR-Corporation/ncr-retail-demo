import {
  getCurrentUserProfileData,
  updateCurrentUser,
} from '~/lib/provisioning';
import { exchangeToken } from '~/lib/security';

export default async function handler(req, res) {
  let authorization = req.headers.authorization;
  let token = authorization.split(' ')[1];
  if (req.method === 'GET') {
    let response = await getCurrentUserProfileData(token);
    if (response.status === 401) {
      // Try and reauthenticate with token.
      let exchange = await exchangeToken(authorization);
      console.log('exchange token', exchange);
      if (exchange.status !== 200) {
        res.json({ status: exchange.status });
      } else {
        res.json(exchange);
      }
    } else {
      res.json(response);
    }
  } else if (req.method === 'PUT') {
    let response = await updateCurrentUser(token, req.body);
    res.json(response);
  }
}
