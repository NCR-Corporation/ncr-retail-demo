import sendRequest from './sendRequest';

const baseUrl = 'https://gateway-staging.ncrcloud.com/site/sites';

export async function createSite(values) {
  let data = await sendRequest(`${baseUrl}`, `POST`, values)
  return data;
}

export async function updateSite(id, values) {
  let data = await sendRequest(`${baseUrl}/${id}`, `PUT`, values);
  return data;
}

export async function getSites(showInactive = false) {
  let body = JSON.stringify({ "criteria": {}, "fields": ["referenceId", "address"] })
  let data = await sendRequest(`${baseUrl}/find-by-criteria`, 'POST', body)
  if (showInactive) {
    body = JSON.stringify({ "criteria": { "status": "INACTIVE" }, "fields": ["referenceId", "address"] })
    let inactiveData = await sendRequest(`${baseUrl}/find-by-criteria`, 'POST', body);
    let newData = data.data.pageContent.concat(inactiveData.data.pageContent);
    data.data.pageContent = newData;
  }

  return data;
}

export async function findNearby(latitude, longitude) {
  if (latitude && longitude) {
    let response = await sendRequest(`${baseUrl}/find-nearby/${latitude},${longitude}?radius=80467`, 'GET')
    return response;
  } else {
    let body = JSON.stringify({ "criteria": {}, "fields": ["referenceId", "address"] })
    let response = await sendRequest(`${baseUrl}/find-by-criteria/`, 'POST', body)
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