import { getCurrentUserProfileData, updateCurrentUser } from '~/lib/provisioning';
import { exchangeToken } from '~/lib/security';
let logs = [];
/**
 * @swagger
 * /api/user:
 *  get:
 *    description: Returns the current user profile data. If the user profile returns 401, it attempts to reauthenticate the user with the token.
 *    responses:
 *      200:
 *        description: Returns the user data.
 *  put:
 *    description: Updates the current user
 */
export default async function handler(req, res) {
  let authorization = req.headers.authorization;
  let token = authorization.split(' ')[1];
  if (req.method === 'GET') {
    let response = await getCurrentUserProfileData(token);
    console.log('eh ', response);
    logs.push(response.log);
    if (response.status === 401) {
      // Try and reauthenticate with token.
      let exchange = await exchangeToken(authorization);
      console.log('exchange', exchange);
      logs.push(exchange.log);
      if (exchange.status !== 200) {
        // Status 500 here because useUser has special fetcher function.
        res.status(exchange.status).json({ status: 500, logs });
      } else {
        // TODO: Should this be fetching getCurrentUserProfileData again with the exchange token?
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
