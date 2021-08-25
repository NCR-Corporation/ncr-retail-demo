import miniMenu from '~/data/miniMenu.json';
import {
  createCatalogItems,
  createCatalogPricesItem,
  getSiteCatalogItemDetailsByItemCode,
  createCatalogAttributesItem,
  getLinkGroupByLinkGroupCode,
  createLinkGroups,
  getCatalogItemByItemCode,
  getCatalogItemPricesBySiteId,
  getCatalogItemAttributesBySiteIdItemCodes
} from '~/lib/catalog';
import { createSite, getSites } from '~/lib/sites';

export default async function handler(_, res) {
  // Step 1. Create all sites.
  let site = await getSites(false, true);
  for (let i = 0; i < site.pageContent.length; i++) {
    let currentSite = site.pageContent[i];
    await createSite(currentSite);
  }

  let { linkGroups, salesItems } = miniMenu;

  // Step 2: Go through all link groups. For each link group, get each link item
  // add each link item, link item attributes, link item prices to mini batch array
  // Then add each link group response to array for minibatch.
  let linkGroupsMiniBatch = [];
  console.log(`Num linkedGroups: ${linkGroups.length}`);
  for (let i = 0; i < linkGroups.length; i++) {
    let externalLinkGroup = linkGroups[i];
    let { id } = externalLinkGroup;
    let linkGroup = await getLinkGroupByLinkGroupCode(id, true);
    delete linkGroup.auditTrail;
    linkGroupsMiniBatch.push(linkGroup);

    console.log(`GET Link Groups Progress: ${((i / linkGroups.length) * 100).toFixed(2)}%`);

    let linkItemsMiniBatch = [];
    let linkItemPricesMiniBatch = [];
    let linkItemAttributesMiniBatch = [];
    for (let i = 0; i < linkGroup.linkItems.length; i++) {
      let currentItem = linkGroup.linkItems[i];
      let { itemCode } = currentItem;
      for (let j = 0; j < site.pageContent.length; j++) {
        let siteId = site.pageContent[j].id;
        let externalCatalogItem = await getCatalogItemByItemCode(itemCode, true);
        let externalCatalogItemAttributes = await getCatalogItemAttributesBySiteIdItemCodes(siteId, itemCode, true);
        let externalCatalogItemPrices = await getCatalogItemPricesBySiteId(siteId, itemCode, true);

        if (externalCatalogItem) {
          delete externalCatalogItem['auditTrail'];
          linkItemsMiniBatch.push(externalCatalogItem);
        }
        if (externalCatalogItemAttributes) {
          if (!externalCatalogItemAttributes.statusCode || externalCatalogItemAttributes.statusCode != 404) {
            delete externalCatalogItemAttributes['auditTrail'];
            linkItemAttributesMiniBatch.push(externalCatalogItemAttributes);
          }
        }
        if (externalCatalogItemPrices) {
          for (let k = 0; k < externalCatalogItemPrices.length; k++) {
            let currentItemPrice = externalCatalogItemPrices[k];
            delete currentItemPrice['auditTrail'];
            delete currentItemPrice['batchStatus'];
            linkItemPricesMiniBatch.push(currentItemPrice);
          }
        }
        console.log(`GET SITE Linked Items Progress: ${((j / site.pageContent.length) * 100).toFixed(2)}%`);
      }

      console.log(`GET Linked Items Progress: ${((i / linkGroup.linkItems.length) * 100).toFixed(2)}%`);
    }

    console.log(`------------`);
    console.log(`numLinkItems: ${linkItemsMiniBatch.length}, numLinkItemPrices: ${linkItemPricesMiniBatch.length}, numLinkItemAttributes: ${linkItemAttributesMiniBatch.length}`);
    console.log(`------------`);

    const linkItemsMiniBatchLength = JSON.parse(JSON.stringify(linkItemsMiniBatch)).length;
    while (linkItemsMiniBatch.length > 0) {
      let current = linkItemsMiniBatch.splice(0, 1000);
      let body = {
        items: current
      };
      await createCatalogItems(body);
      console.log(`POST Linked Items Progress: ${((linkItemsMiniBatch.length / linkItemsMiniBatchLength) * 100).toFixed(2)}%`);
    }
    console.log(`------ Catalog Items Created -------`);

    const linkItemPricesMiniBatchLength = JSON.parse(JSON.stringify(linkItemPricesMiniBatch)).length;
    while (linkItemPricesMiniBatch.length > 0) {
      let current = linkItemPricesMiniBatch.splice(0, 1000);
      let body = {
        itemPrices: current
      };
      await createCatalogPricesItem(body);
      console.log(`POST Linked Item Prices Progress: ${((linkItemPricesMiniBatch.length / linkItemPricesMiniBatchLength) * 100).toFixed(2)}%`);
    }
    console.log(`------ Catalog Item Prices Created -------`);

    const linkItemAttributesMiniBatchLength = JSON.parse(JSON.stringify(linkItemAttributesMiniBatch)).length;
    while (linkItemAttributesMiniBatch.length > 0) {
      let current = linkItemAttributesMiniBatch.splice(0, 1000);
      let body = {
        itemAttributes: current
      };
      await createCatalogAttributesItem(body);
      console.log(`POST Linked Item Prices Progress: ${((linkItemAttributesMiniBatch.length / linkItemAttributesMiniBatchLength) * 100).toFixed(2)}%`);
    }
    console.log(`------ Catalog Item Attributes Created -------`);

    const linkGroupsMiniBatchLength = JSON.parse(JSON.stringify(linkGroupsMiniBatch)).length;
    while (linkGroupsMiniBatch.length > 0) {
      let current = linkGroupsMiniBatch.shift();
      let body = {
        linkGroups: [current]
      };
      let response = await createLinkGroups(body);
      console.log(`${current.linkGroupId.linkGroupCode}: ${response.status}`);
      console.log(`POST Link Groups Progress: ${(((linkGroupsMiniBatchLength - linkGroupsMiniBatch.length) / linkGroupsMiniBatchLength) * 100).toFixed(2)}%`);
    }
    console.log(`------ Link ItemsCreated -------`);
  }

  // Step 3: Go through sales items, get item-details by ID, similar to step 2.
  console.log(`Num salesItems: ${salesItems.length}`);
  let salesItemsMiniBatch = [];
  let salesItemPricesMiniBatch = [];
  let salesItemAttributesMiniBatch = [];
  for (let i = 0; i < salesItems.length; i++) {
    let currentItem = salesItems[i];
    let { id: itemCode } = currentItem;
    for (let j = 0; j < site.pageContent.length; j++) {
      let siteId = site.pageContent[j].id;
      let externalCatalogItem = await getCatalogItemByItemCode(itemCode, true);
      let externalCatalogItemAttributes = await getCatalogItemAttributesBySiteIdItemCodes(siteId, itemCode, true);
      let externalCatalogItemPrices = await getCatalogItemPricesBySiteId(siteId, itemCode, true);

      if (externalCatalogItem) {
        delete externalCatalogItem['auditTrail'];
        salesItemsMiniBatch.push(externalCatalogItem);
      }
      if (externalCatalogItemAttributes) {
        if (!externalCatalogItemAttributes.statusCode || externalCatalogItemAttributes.statusCode == 404) {
          delete externalCatalogItemAttributes['auditTrail'];
          salesItemAttributesMiniBatch.push(externalCatalogItemAttributes);
        }
      }
      if (externalCatalogItemPrices) {
        for (let k = 0; k < externalCatalogItemPrices.length; k++) {
          let currentItemPrice = externalCatalogItemPrices[k];
          delete currentItemPrice['auditTrail'];
          delete currentItemPrice['batchStatus'];
          salesItemPricesMiniBatch.push(currentItemPrice);
        }
      }
    }

    console.log(`GET Sales Items Progress: ${((i / salesItems.length) * 100).toFixed(2)}%`);
  }

  console.log(`------------`);
  console.log(`numSalesItems: ${salesItemsMiniBatch.length}, numSalesItemPrices: ${salesItemPricesMiniBatch.length}, numSalesItemAttributes: ${salesItemAttributesMiniBatch.length}`);
  console.log(`------------`);

  const salesItemsMiniBatchLength = JSON.parse(JSON.stringify(salesItemsMiniBatch)).length;
  while (salesItemsMiniBatch.length > 0) {
    let current = salesItemsMiniBatch.splice(0, 1000);
    let body = {
      items: current
    };
    await createCatalogItems(body);
    console.log(`POST Sales Items Progress: ${((salesItemsMiniBatch.length / salesItemsMiniBatchLength) * 100).toFixed(2)}%`);
  }
  console.log(`------ Catalog Items Created -------`);

  const salesItemPricesMiniBatchLength = JSON.parse(JSON.stringify(salesItemPricesMiniBatch)).length;
  while (salesItemPricesMiniBatch.length > 0) {
    let current = salesItemPricesMiniBatch.splice(0, 1000);
    let body = {
      itemPrices: current
    };
    await createCatalogPricesItem(body);
    console.log(`POST Sales Item Prices Progress: ${((salesItemPricesMiniBatch.length / salesItemPricesMiniBatchLength) * 100).toFixed(2)}%`);
  }
  console.log(`------ Catalog Item Prices Created -------`);

  const salesItemAttributesMiniBatchLength = JSON.parse(JSON.stringify(salesItemAttributesMiniBatch)).length;
  while (salesItemAttributesMiniBatch.length > 0) {
    let current = salesItemAttributesMiniBatch.splice(0, 1000);
    let body = {
      itemAttributes: current
    };
    await createCatalogAttributesItem(body);
    console.log(`POST Sales Item Prices Progress: ${((salesItemAttributesMiniBatch.length / salesItemAttributesMiniBatchLength) * 100).toFixed(2)}%`);
  }
  console.log(`------ Catalog Item Attributes Created -------`);

  res.status(200).json({ message: 'Success' });
}
