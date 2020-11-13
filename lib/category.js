import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/catalog`

export async function getCategoryNodes(query) {
  // TODO: if query is not null
  let response = await sendRequest(`${baseUrl}/category-nodes`, 'GET')
  return response;
}

export async function getAllCategoryNodes() {
  // TODO: if query is not null
  let response = await sendRequest(`${baseUrl}/category-nodes`, 'GET')
  let parentCategories = response.data.pageContent;
  let parentCategoriesIds = [];
  parentCategories.forEach(category => {
    parentCategoriesIds.push(category.nodeCode);
  });

  let parentCategoriesMap = {};
  const promises = parentCategories.map(async category => {
    const children = await getCategoriesByParentId(category.nodeCode)
    let nodeCode = category.nodeCode;
    parentCategoriesMap[nodeCode] = children.data.pageContent;
    return children;
  })

  await Promise.all(promises)

  let result = [];
  parentCategories.forEach(category => {
    category['children'] = parentCategoriesMap[category.nodeCode];
    result.push(category);
  })
  return result;
}

export async function getCategoryById(id) {
  let response = await sendRequest(`${baseUrl}/category-nodes/${id}`, 'GET');
  return response;
}

export async function getCategoriesByParentId(parentId) {
  let response = await sendRequest(`${baseUrl}/category-nodes?parentId=${parentId}`, 'GET');
  return response;
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