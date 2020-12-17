import sendRequest from './sendRequest';
import sendAuthenticatedRequest from './sendAuthenticatedRequest';

const baseUrl = 'https://gateway-staging.ncrcloud.com/provisioning';

export async function createUser(values) {
  return await sendRequest(`${baseUrl}/users`, 'POST', values);
}

export async function updateCurrentUser(token, values) {
  console.log(token, values);
  let res = await sendAuthenticatedRequest(
    `${baseUrl}/users`,
    `PUT`,
    JSON.parse(values),
    null,
    token
  );
  return res;
}

export async function getCurrentUserProfileData(token) {
  return await sendAuthenticatedRequest(
    `${baseUrl}/user-profiles`,
    'GET',
    null,
    null,
    token
  );
}
