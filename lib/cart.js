import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/emerald/selling-service/v1/carts`;

export async function createCart(siteId, cart) {
  return await sendRequest(`${baseUrl}`, 'POST', null, siteId, true);
}

export async function addItemToCart(siteId, cartId, item) {
  console.log(siteId, cartId);
  let cart = await sendRequest(
    `${baseUrl}/${cartId}/items`,
    'POST',
    JSON.stringify(item),
    siteId
  );
  return cart;
}
