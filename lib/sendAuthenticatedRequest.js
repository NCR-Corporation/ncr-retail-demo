/**
 * Retrieves the root access token from HMAC.
 *
 * @param {string} url URL for API request
 * @param {string} method GET/PUT/POST
 * @param {object} body Optional object to send (not stringified)
 * @param {string} enterpriseUnit Optaionl enterpriseUnitId
 */
export default async function sendAuthenticatedRequest(url, method, body = null, enterpriseUnit = null, token) {
  let date = new Date();

  let headers = {
    url,
    date,
    method,
    contentType: 'application/json',
    organization: process.env.REACT_APP_BSP_ORGANIZATION
  };

  let requestOptions = {
    method: headers.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `AccessToken ${token}`,
      'nep-organization': headers.organization,
      Date: date.toGMTString()
    }
  };

  if (body !== null) {
    requestOptions['body'] = JSON.stringify(body);
  }
  if (enterpriseUnit !== null) {
    requestOptions.headers['nep-enterprise-unit'] = enterpriseUnit;
  }

  const res = await fetch(`${headers.url}`, requestOptions);
  let requestObject = {
    url: headers.url,
    request: requestOptions
  };

  requestObject['request']['headers']['Authorization'] = 'AccessToken ****';
  requestObject['request']['headers']['nep-organization'] = '****';
  if (enterpriseUnit !== null) {
    requestObject['request']['headers']['nep-enterprise-unit'] = '****';
  }

  let log = { req: requestObject, res };

  const status = res.status;
  if (status == 200) {
    const data = await res.json();
    return { status, data, log };
  } else {
    return { status, log };
  }
}
