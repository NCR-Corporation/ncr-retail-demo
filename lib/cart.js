import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/emerald/selling-service/v1/carts`;

export async function createCart(siteId, cart) {
  return await sendRequest(`${baseUrl}`, 'POST', null, siteId, true);
}

export async function getCartById(siteId, cartId) {
  return await sendRequest(`${baseUrl}/${cartId}`, 'GET', null, siteId);
}

export async function addItemToCart(siteId, cartId, etag, item) {
  console.log(siteId, cartId);
  console.log('car item', item);
  let cart = await sendRequest(
    `${baseUrl}/${cartId}/items`,
    'POST',
    item,
    siteId
  );
  console.log('the status', cart);
  return cart;
}
