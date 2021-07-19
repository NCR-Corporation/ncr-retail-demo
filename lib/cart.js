import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/emerald/selling-service/cart/v1/carts`;

export async function createCart(siteId) {
  return await sendRequest(`${baseUrl}`, 'POST', {}, siteId, true);
}

export async function deleteCart(siteId, cartId) {
  return await sendRequest(`${baseUrl}/${cartId}`, 'DELETE', null, siteId);
}

export async function getCartById(siteId, cartId) {
  return await sendRequest(`${baseUrl}/${cartId}`, 'GET', null, siteId);
}

export async function getCartItemsById(siteId, cartId) {
  return await sendRequest(`${baseUrl}/${cartId}/items`, 'GET', null, siteId);
}

export async function addItemToCart(siteId, cartId, etag, item) {
  let cart = await sendRequest(`${baseUrl}/${cartId}/items`, 'POST', item, siteId);
  return cart;
}

export async function updateItemInCartById(siteId, cartId, etag, lineId, item) {
  let cart = await sendRequest(`${baseUrl}/${cartId}/items/${lineId}`, 'PATCH', item, siteId);
  return cart;
}

export async function removeItemInCartById(siteId, cartId, lineId) {
  let cart = await sendRequest(`${baseUrl}/${cartId}/items/${lineId}`, 'DELETE', { voidReason: 'removed' }, siteId);
  return cart;
}

export async function updateUserCartStatus(siteId, cartId, status) {
  let cart = await sendRequest(`${baseUrl}/${cartId}`, 'PATCH', { status }, siteId);
  return cart;
}
