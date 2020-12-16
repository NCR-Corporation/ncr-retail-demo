import sendRequest from './sendRequest';
const baseUrl = `https://gateway-staging.ncrcloud.com/order/3/orders/1`;

export async function createOrder(siteId, order) {
  return await sendRequest(`${baseUrl}`, 'POST', order, siteId);
}

export async function getOrderById(id) {
  return await sendRequest(`${baseUrl}/${id}`, 'GET');
}

export async function getOrdersByUser(user) {
  let obj = { customerId: user, returnFullOrders: true };
  return await sendRequest(`${baseUrl}/find`, 'POST', obj);
}

export async function getAllOrders() {
  let obj = { returnFullOrders: true };
  return await sendRequest(`${baseUrl}/find`, 'POST', obj);
}
