import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/catalog`;

export async function createItemPricesForItem(id, values) {
  let data = await sendRequest(`${baseUrl}/item-prices`, 'PUT', values);
  return data;
}
