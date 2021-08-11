import { createCatalogItems, createCatalogPricesItem, createCatalogAttributesItem } from '~/lib/catalog';
import { getSites } from '~/lib/sites';
let logs = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);
    let { data, log } = await getSites();
    logs.push(log);
    let items = [];
    let prices = [];
    let attributes = [];
    data.pageContent.forEach((site) => {
      let itemCopy = JSON.parse(JSON.stringify(body));
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
    });

    let itemsBody = { items: items };
    let pricesBody = { itemPrices: prices };
    let attributesBody = { itemAttributes: attributes };
    let itemsResponse = await createCatalogItems(itemsBody);
    logs.push(itemsResponse.log);
    let pricesResponse = await createCatalogPricesItem(pricesBody);
    logs.push(pricesResponse.log);
    let attributesResponse = await createCatalogAttributesItem(attributesBody);
    logs.push(attributesResponse.log);

    res.status(200).json({
      itemsResponse,
      pricesResponse,
      attributesResponse,
      logs
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
