import { encode, decode } from 'js-base64';
import sendRequest from './sendRequest';

const baseUrl = 'https://gateway-staging.ncrcloud.com/security';

export async function authenticateUser(username, password) {
  console.log('authenticateUser');
  let fullUsername = `acct:${process.env.REACT_APP_BSP_ORGANIZATION}@${username}`;
  console.log(fullUsername);
  let combined = fullUsername + ':' + password;
  let encoded = encode(combined);
  let requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + encoded,
      'nep-organization': process.env.REACT_APP_BSP_ORGANIZATION,
    },
  };
  const response = await fetch(
    `${baseUrl}/authentication/login`,
    requestOptions
  );
  console.log(response);
  const status = response.status;
  console.log('stat', status);
  const data = await response.json();
  return { status, data };
}

export async function setPassword(username, password) {
  return await sendRequest(
    `${baseUrl}/security-user-passwords/${username}`,
    'PUT',
    JSON.stringify({ password })
  );
}
