import { createCatalogItems, createCatalogPricesItem, createCatalogAttributesItem } from '../../lib/catalog';
import { getSites } from '../../lib/sites';

export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  let { data } = await getSites();
  let items = [];
  let prices = [];
  let attributes = [];
  data.pageContent.forEach(site => {
    let itemCopy = JSON.parse(JSON.stringify(body));
    let itemPrice = {
      "version": 1,
      "price": itemCopy.price,
      "currency": itemCopy.currency,
      "effectiveDate": itemCopy.effectiveDate,
      "status": itemCopy.status,
      "priceId": {
        "itemCode": itemCopy.itemId.itemCode,
        "enterpriseUnitId": site.id,
        "priceCode": itemCopy.itemId.itemCode
      }
    };
    delete itemCopy['price'];
    delete itemCopy['currency'];
    delete itemCopy['effectiveDate'];

    let itemAttributes = Object.assign({}, itemCopy);
    itemAttributes["imageUrls"] = [itemCopy.imageUrl];
    itemAttributes["itemAttributesId"] = {
      "itemCode": itemCopy.itemId.itemCode,
      "enterpriseUnitId": site.id
    };
    delete itemAttributes['imageUrl'];
    delete itemAttributes['departmentId'];
    delete itemAttributes['nonMerchandise'];
    delete itemAttributes['itemId'];

    delete itemCopy['imageUrl'];

    delete itemCopy['imageUrl'];
    items.push(itemCopy);
    prices.push(itemPrice);
    attributes.push(itemAttributes);
  });

  let itemsBody = { "items": items };
  let pricesBody = { "itemPrices": prices };
  let attributesBody = { "itemAttributes": attributes };
  let itemsResponse = await createCatalogItems(JSON.stringify(itemsBody));
  let pricesResponse = await createCatalogPricesItem(JSON.stringify(pricesBody));
  let attributesResponse = await createCatalogAttributesItem(JSON.stringify(attributesBody));

  res.json([itemsResponse, pricesResponse, attributesResponse])

  // let response = await createCatalogItem(req.body)
  // res.json(response);
  // res.json({});
}