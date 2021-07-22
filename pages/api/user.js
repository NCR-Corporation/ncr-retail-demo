import { getCurrentUserProfileData, updateCurrentUser } from '~/lib/provisioning';
import { exchangeToken } from '~/lib/security';
let logs = [];

export default async function handler(req, res) {
  let authorization = req.headers.authorization;
  let token = authorization.split(' ')[1];
  if (req.method === 'GET') {
    let response = await getCurrentUserProfileData(token);
    logs.push(response.log);
    if (response.status === 401) {
      // Try and reauthenticate with token.
      let exchange = await exchangeToken(authorization);
      logs.push(exchange.log);
      if (exchange.status !== 200) {
        // Status 500 here because useUser has special fetcher function.
        res.status(exchange.status).json({ status: 500, logs });
      } else {
        res.status(exchange.status).json({ exchange, logs });
      }
    } else {
      res.status(response.status).json({ data: response.data, logs });
    }
  } else if (req.method === 'PUT') {
    let response = await updateCurrentUser(req.body);
    logs.push(response.log);
    res.status(response.status).json({ response, logs });
  }
}
