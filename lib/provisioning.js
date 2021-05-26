import sendRequest from './sendRequest';
import sendAuthenticatedRequest from './sendAuthenticatedRequest';

const baseUrl = 'https://gateway-staging.ncrcloud.com/provisioning';

export async function createUser(values) {
  return await sendRequest(`${baseUrl}/users`, 'POST', values);
}

export async function updateCurrentUser(values) {
  return await sendRequest(`${baseUrl}/users`, `PUT`, JSON.parse(values), null);
}

export async function getCurrentUserProfileData(token) {
  return await sendAuthenticatedRequest(`${baseUrl}/user-profiles`, 'GET', null, null, token);
}
