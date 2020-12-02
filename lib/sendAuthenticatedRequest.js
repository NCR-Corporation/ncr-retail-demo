import generateHMAC from '~/ncr-hmac';

/**
 * Retrieves the root access token from HMAC.
 *
 * @param {string} url URL for API request
 * @param {string} method GET/PUT/POST
 * @param {object} body Optional object to send (not stringified)
 * @param {string} enterpriseUnit Optaionl enterpriseUnitId
 */
export default async function sendAuthenticatedRequest(
  url,
  method,
  body = null,
  enterpriseUnit = null
) {
  let gateway =
    'https://gateway-staging.ncrcloud.com/security/authentication/login';

  let date = new Date();

  let headers = {
    url: gateway,
    date,
    method: 'POST',
    contentType: 'application/json',
    organization: process.env.REACT_APP_BSP_ORGANIZATION,
    secretKey: process.env.REACT_APP_BSP_SECRET_KEY,
    // content-md5?
  };

  const hmacAccessKey = generateHMAC(headers);
  console.log('hc');

  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `AccessKey ${process.env.REACT_APP_BSP_SHARED_KEY}:${hmacAccessKey}`,
      'nep-organization': headers.organization,
      'nep-application-key': '',
      Date: date.toGMTString(),
    },
  };
  console.log('HERE');

  const res = await fetch(`${headers.url}`, requestOptions);
  if (res.status == 200) {
    let data = await res.json();
    console.log('the data', data);
    let token = data.token;
    console.log('the token', token);
    date = new Date();
    requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `AccessKey ${token}`,
        'nep-organization': process.env.REACT_APP_BSP_ORGANIZATION,
        Date: date.toGMTString(),
      },
    };
    if (body !== null) {
      requestOptions['body'] = JSON.stringify(body);
    }
    if (enterpriseUnit !== null) {
      requestOptions.headers['nep-enterprise-unit'] = enterpriseUnit;
    }
    console.log(url, requestOptions);
    const response = await fetch(url, requestOptions);
    console.log('res', response);
    const status = response.status;
    if (status === 204) {
      return { status };
    }
    data = await response.json();
    return { status, data };
  } else {
    return { status };
  }
}
