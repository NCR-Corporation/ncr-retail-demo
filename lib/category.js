import sendRequest from './sendRequest';

const baseUrl = `https://gateway-staging.ncrcloud.com/catalog`

export function listAllCategories(categories) {
  let copy = categories.slice();
  let output = [];
  let level = 0;
  while (copy.length > 0) {
    let current = copy.shift();
    output.push({ "id": current.nodeCode, "title": current.title.value, level: current.level ? current.level : 0 })
    if (current.children && Object.keys(current.children).length > 1) {
      if (current.level) {
        level = current.level + 1;
      } else {
        level = 1;
      }
      for (const key in current.children) {
        if (key !== "array") {
          let currentCopy = JSON.parse(JSON.stringify(current.children[key]));
          currentCopy['level'] = level;
          copy.push(currentCopy);
        }
      }
    }
  }
  return output;
}

export async function createCategory(values) {
  let data = await sendRequest(`${baseUrl}/category-nodes`, 'PUT', values);
  return data;
}

export async function updateCategory(values) {
  let data = await sendRequest(`${baseUrl}/category-nodes`, 'PUT', values);
  return data;
}

export async function getCategoryNodes(query) {
  let response = await sendRequest(`${baseUrl}/category-nodes`, 'GET')
  return response;
}

export async function getAllCategoryNodes(flatten = false) {
  let response = await sendRequest(`${baseUrl}/category-nodes`, 'GET')
  let parentCategories = response.data.pageContent;
  let allCategories = [];
  let parentCategoriesIds = [];
  parentCategories.forEach(category => {
    parentCategoriesIds.push(category.nodeCode);
    allCategories.push(category);
  });

  let parentCategoriesMap = {};
  const promises = parentCategories.map(async category => {
    const children = await getCategoriesByParentId(category.nodeCode)
    let nodeCode = category.nodeCode;
    let childrenData = children.data.pageContent;
    let output = {};
    let outputArray = [];
    childrenData.forEach(child => {
      output[child.nodeCode] = child;
      outputArray.push(child.nodeCode);
      allCategories.push(child);
    })
    parentCategoriesMap[nodeCode] = output;
    parentCategoriesMap[nodeCode]['array'] = outputArray;
    return children;
  })

  await Promise.all(promises)

  let result = [];
  parentCategories.forEach(category => {
    category['children'] = parentCategoriesMap[category.nodeCode];
    result.push(category);
  })

  // We know it is only 3 layers deep so shortcutting this.
  let finalResult = [];
  let currentResult = result.slice();
  let promiseOne = currentResult.map(async root => {
    // Deep copy the object
    let copied = JSON.parse(JSON.stringify(root));
    const children = root.children;
    const promiseTwo = children.array.map(async child => {
      const grandChildren = await getCategoriesByParentId(child)
      let grandChildrenData = grandChildren.data.pageContent;
      let output = {};
      grandChildrenData.forEach(grandChild => {
        output[grandChild.nodeCode] = grandChild;
        allCategories.push(grandChild);
      })
      parentCategoriesMap[copied.nodeCode][child] = output;
      return grandChildren;
    })

    await Promise.all(promiseTwo);
    children.array.forEach(child => {
      copied.children[child]['children'] = parentCategoriesMap[root.nodeCode][child]
    });
    finalResult.push(copied);
  })

  await Promise.all(promiseOne);

  if (flatten) { return allCategories; }
  return finalResult
}

export async function getCategoryById(id) {
  let response = await sendRequest(`${baseUrl}/category-nodes/${id}`, 'GET');
  return response;
}

export async function getCategoriesByParentId(parentId) {
  let response = await sendRequest(`${baseUrl}/category-nodes?parentId=${parentId}`, 'GET');
  return response;
}

export async function getCatalogItemCategoryAncestorsByMerchandiseCategory(nodeId) {
  let response = await sendRequest(`${baseUrl}/category-nodes/${nodeId}/ancestors`, 'GET');
  return response;
}

export async function getCatelogItemsByMerchandiseCategoryId(name, siteId) {
  let response = await sendRequest(`${baseUrl}/item-details/search?merchandiseCategoryId=${name}&itemStatus=ACTIVE`, 'GET', null, siteId);
  return response;
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