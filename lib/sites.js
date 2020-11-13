import sendRequest from './sendRequest';

const baseUrl = 'https://gateway-staging.ncrcloud.com/site/sites';

export async function createSite(values) {
  let data = await sendRequest(`${baseUrl}`, `POST`, values)
  return data;
}

export async function getSites(query) {
  let body = JSON.stringify({ "criteria": {}, "fields": ["referenceId"] })
  let data = await sendRequest(`${baseUrl}/find-by-criteria`, 'POST', body)
  console.log('the data', data);
  return data;
}

export async function findNearby(latitude, longitude) {
  if (latitude && longitude) {
    let response = await sendRequest(`${baseUrl}/find-nearby/${latitude},${longitude}`, 'GET')
    return response;
  } else {
    let response = await sendRequest(`${baseUrl}/find-by-criteria/`, 'POST', JSON.stringify({}))
    return response;

  }
}

export async function getByReferenceId(id) {
  let response = await sendRequest(`${baseUrl}/by-reference-id/${id}`, 'GET')
  return response;
}

export async function getById(id) {
  let response = await sendRequest(`${baseUrl}/${id}`, 'GET')
  return response;
}