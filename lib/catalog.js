import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/catalog`

export async function searchCatalogItems(query) {

}

export async function getCatelogItemsByMerchandiseCategoryId(name, id) {
  let response = await sendRequest(`${baseUrl}/items/?merchandiseCategoryId=${name}&itemStatus=ACTIVE`, 'GET');
  if (response.pageContent.length > 0) {
    let items = response.pageContent;
    let itemCodes = [];
    let itemsObject = {};
    items.forEach((item) => {
      itemCodes.push({ "itemCode": item.itemId.itemCode });
      itemsObject[item.itemId.itemCode] = item;
    });
    const prices = await getCatalogItemPricesByItemCodes(id, itemCodes);
    console.log('the prices', prices);
    prices.itemPrices.forEach((itemPrice) => {
      itemsObject[itemPrice.priceId.itemCode]['item-price'] = itemPrice;
    })
    return itemsObject;


  } else {
    return response;
  }
}

export async function getCatalogItemPricesByItemCodes(siteId, itemCodes) {
  let itemIds = {};
  itemIds.itemIds = itemCodes;
  let response = await sendRequest(`${baseUrl}/item-prices/get-multiple`, 'POST', itemIds, siteId);
  return response;
}

export async function getCatalogItemByItemCode(id) {
  let response = await sendRequest(`${baseUrl}/items/${id}`, 'GET');
  return response;
}