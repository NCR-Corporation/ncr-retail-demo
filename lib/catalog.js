import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/catalog`

export async function createCatalogItem(id, values) {
  // let data = await sendRequest(`${baseUrl}/items/${id}`, 'PUT', values)
  return data;
}

export async function createCatalogItems(values) {
  let data = await sendRequest(`${baseUrl}/items/`, 'PUT', values)
  return data;
}

export async function createCatalogPricesItem(values) {
  let data = await sendRequest(`${baseUrl}/item-prices`, 'PUT', values)
  return data;
}

export async function createCatalogAttributesItem(values) {
  let data = await sendRequest(`${baseUrl}/item-attributes`, 'PUT', values)
  return data;
}

export async function createOrUpdateCatalogItem(id, values) {
  let data = await sendRequest(`${baseUrl}/items/${id}`, 'PUT', values)
  return data;
}

export async function getCatalogItem(siteId, id) {
  let data = await sendRequest(`${baseUrl}/items/${id}`, 'GET', null, siteId);
  return data;
}

export async function getCatalogItems() {
  let data = await sendRequest(`${baseUrl}/items`, 'GET');
  return data;
}

export async function getCatalogItemDetails(id, query) {
  if (query) {
    let data = await sendRequest(`${baseUrl}/item-details/search?shortDescriptionPattern=\*${query}\*&itemStatus=ACTIVE`, 'GET', null, id);
    return data;
  } else {
    let data = await sendRequest(`${baseUrl}/item-details/search?itemStatus=ACTIVE`, 'GET', null, id);
    return data;
  }

}

export async function getCatelogItemsByMerchandiseCategoryId(name, id) {
  let response = await sendRequest(`${baseUrl}/items/?merchandiseCategoryId=${name}&itemStatus=ACTIVE`, 'GET');
  if (response.data.pageContent.length > 0) {
    let items = response.data.pageContent;
    let itemCodes = [];
    let itemsObject = {};
    items.forEach((item) => {
      itemCodes.push({ "itemCode": item.itemId.itemCode });
      itemsObject[item.itemId.itemCode] = item;
    });
    // const prices = await getCatalogItemPricesByItemCodes(id, itemCodes);
    // prices.itemPrices.forEach((itemPrice) => {
    //   itemsObject[itemPrice.priceId.itemCode]['item-price'] = itemPrice;
    // })
    return itemsObject;


  } else {
    return {};
  }
}

export async function getCatalogItemPricesByItemCodes(siteId, itemCodes) {
  let itemIds = {};
  itemIds.itemIds = itemCodes;
  let response = await sendRequest(`${baseUrl}/item-prices/get-multiple`, 'POST', JSON.stringify(itemIds), siteId);
  return response;
}

export async function getCatalogItemAttributesByItemCodes(siteId, itemCodes) {
  let itemIds = {};
  itemIds.itemIds = itemCodes;
  let response = await sendRequest(`${baseUrl}/item-attributes/get-multiple`, 'POST', JSON.stringify(itemIds), siteId);
  return response;
}

export async function getCatalogItemByItemCode(id) {
  let response = await sendRequest(`${baseUrl}/items/${id}`, 'GET');
  return response;
}