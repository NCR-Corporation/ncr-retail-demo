import { getCurrentUserProfileData } from '~/lib/provisioning';
import { exchangeToken } from '~/lib/security';

export default async function handler(req, res) {
  let authorization = req.headers.authorization;
  authorization = authorization.split(' ')[1];
  let response = await getCurrentUserProfileData(authorization);
  if (response.status === 401) {
    // Try and reauthenticate with token.
    let exchange = await exchangeToken(authorization);
    console.log('ex', exchange);
    res.json({});
  } else {
    res.json(response);
  }
}
