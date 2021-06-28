import catalog from '~/data/catalog.json';
import categories from '~/data/categories.json';
import groups from '~/data/groups.json';
import sites from '~/data/sites.json';
import { createSite, getSites } from '~/lib/sites';

import { createGroup } from '~/lib/groups';
import { createCategory } from '~/lib/category';
import { createCatalogItems, createCatalogPricesItem, createCatalogAttributesItem } from '~/lib/catalog';

export default async function handler(req, res) {
  for (let i = 0; i < sites.length; i += 1) {
    await createSite(sites[i]);
  }

  for (let i = 0; i < groups.length; i += 1) {
    await createGroup(groups[i]);
  }

  let categoryObject = { nodes: categories };
  await createCategory(categoryObject);

  let catalogPromise = [];
  for (let i = 0; i <= catalog.length; i += 1) {
    let item = catalog[i];
    let { data } = await getSites();
    let items = [];
    let prices = [];
    let attributes = [];
    for (let j = 0; j < data.pageContent.length; j++) {
      let site = data.pageContent[j];
      let itemCopy = JSON.parse(JSON.stringify(item));
      let itemPrice = {
        version: 1,
        price: itemCopy.price,
        currency: itemCopy.currency,
        effectiveDate: itemCopy.effectiveDate,
        status: itemCopy.status,
        basePrice: true,
        priceId: {
          itemCode: itemCopy.itemId.itemCode,
          enterpriseUnitId: site.id,
          priceCode: itemCopy.itemId.itemCode
        },
        dynamicAttributes: [
          {
            type: 'retail-price',
            attributes: [
              {
                key: 'UOM',
                value: itemCopy.unitOfMeasure
              },
              {
                key: 'UNITS',
                value: '1'
              }
            ]
          }
        ]
      };
      delete itemCopy['price'];
      delete itemCopy['currency'];
      delete itemCopy['effectiveDate'];
      delete itemCopy['unitOfMeasure'];

      let itemAttributes = Object.assign({}, itemCopy);
      itemAttributes['imageUrls'] = [itemCopy.imageUrl];
      itemAttributes['itemAttributesId'] = {
        itemCode: itemCopy.itemId.itemCode,
        enterpriseUnitId: site.id
      };
      if (itemCopy.groups) {
        itemAttributes['groups'] = [
          {
            groupCode: itemCopy.groups
          }
        ];
        delete itemCopy['groups'];
      }
      delete itemAttributes['imageUrl'];
      delete itemAttributes['departmentId'];
      delete itemAttributes['nonMerchandise'];
      delete itemAttributes['itemId'];
      delete itemAttributes['packageIdentifiers'];

      delete itemCopy['imageUrl'];

      delete itemCopy['imageUrl'];
      items.push(itemCopy);
      prices.push(itemPrice);
      attributes.push(itemAttributes);
    }

    let itemsBody = { items: items };
    let pricesBody = { itemPrices: prices };
    let attributesBody = { itemAttributes: attributes };
    await createCatalogItems(itemsBody);
    await createCatalogPricesItem(pricesBody);
    await createCatalogAttributesItem(attributesBody);
  }

  await Promise.all(catalogPromise);

  res.status(200).json({});
}
