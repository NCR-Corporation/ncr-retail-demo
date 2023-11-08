import sendRequest from './sendRequest';

const baseUrl = 'https://gateway-staging.ncrcloud.com/site/sites';

export async function createSite(values) {
  return await sendRequest(`${baseUrl}`, `POST`, values);
}

export async function updateSite(id, values) {
  return await sendRequest(`${baseUrl}/${id}`, `PUT`, values);
}

export async function getAllSitesAndData() {
  let body = {
    criteria: {},
    fields: ['referenceId', 'address', 'hours', 'contact', 'timeZone', 'locked', 'description', 'currency', 'coordinates', 'status', 'parentEnterpriseUnitId', 'groups', 'dayparts']
  };
  let data = await sendRequest(`${baseUrl}/find-by-criteria`, 'POST', body);
  return data;
}

export async function getSites(showInactive = false) {
  let body = {
    criteria: {},
    fields: ['referenceId', 'address']
  };
  let data = await sendRequest(`${baseUrl}/find-by-criteria`, 'POST', body);
  if (showInactive && data && data.data && data.data.pageContent > 0) {
    body = {
      criteria: { status: 'INACTIVE' },
      fields: ['referenceId', 'address']
    };
    let inactiveData = await sendRequest(`${baseUrl}/find-by-criteria`, 'POST', body);
    let newData = data.data.pageContent.concat(inactiveData.data.pageContent);
    data.data.pageContent = newData;
  }

  return data;
}

export async function findNearby(latitude, longitude) {
  if (latitude && longitude) {
    let response = await sendRequest(`${baseUrl}/find-nearby/${latitude},${longitude}?radius=100000&numSites=10`, 'GET');
    response.data.pageContent = response.data.sites;
    return response;
  } else {
    let body = {
      criteria: { status: 'ACTIVE' },
      fields: ['referenceId', 'address']
    };
    let response = await sendRequest(`${baseUrl}/find-by-criteria/`, 'POST', body);
    return response;
  }
}

export async function getByReferenceId(id) {
  let response = await sendRequest(`${baseUrl}/by-reference-id/${id}`, 'GET');
  return response;
}

export async function getById(id) {
  let response = await sendRequest(`${baseUrl}/${id}`, 'GET');
  return response;
}
