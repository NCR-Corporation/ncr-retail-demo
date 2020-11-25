import generateHMAC from 'ncr-hmac';

export default async function sendRequest(
  url,
  method,
  body = null,
  enterpriseUnit = null
) {
  let date = new Date();

  let headers = {
    url: `${url}`,
    date,
    method: method,
    contentType: 'application/json',
    organization: process.env.REACT_APP_BSP_ORGANIZATION,
    secretKey: process.env.REACT_APP_BSP_SECRET_KEY,
    // content-md5?
  };

  const hmacAccessKey = generateHMAC(headers);

  var requestOptions = {
    method: headers.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `AccessKey ${process.env.REACT_APP_BSP_SHARED_KEY}:${hmacAccessKey}`,
      'nep-organization': headers.organization,
      Date: date.toGMTString(),
    },
  };
  if (body !== null) {
    requestOptions['body'] = body;
  }
  if (enterpriseUnit !== null) {
    requestOptions.headers['nep-enterprise-unit'] = enterpriseUnit;
  }

  const res = await fetch(`${headers.url}`, requestOptions);
  const status = res.status;
  if (status === 204) {
    return { status };
  }
  const data = await res.json();
  return { status, data };
}
