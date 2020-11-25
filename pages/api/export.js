import { exportAllData } from '~/lib/export';
import PostmanCollection from '~/public/Sample Retail APIs.postman_collection.json';
import _ from 'lodash';

export default async function handler(req, res) {
  let response = await exportAllData();
  const { items, sites, categories, itemPrices, itemAttributes } = response;
  let itemsObject = {
    items: items,
  };
  let itemAttributesObject = {
    itemAttributes: itemAttributes,
  };
  let itemPricesObject = {
    itemPrices: itemPrices,
  };
  let categoriesObject = {
    nodes: categories,
  };

  PostmanCollection.item.forEach((item) => {
    switch (item.name) {
      case '1: Create Sites':
        item.request.body.raw = `{ "sites": "${sites}"}`;
        break;
      case '2: Create Categories':
        item.request.body.raw = JSON.stringify(categoriesObject);
        break;
      case '3: Create Items':
        item.request.body.raw = JSON.stringify(itemsObject);
        break;
      case '4: Create Item Prices':
        item.request.body.raw = JSON.stringify(itemPricesObject);
        break;
      case '5: Create Item Attributes':
        item.request.body.raw = JSON.stringify(itemAttributesObject);
        break;
      default:
        break;
    }
  });
  res.json(PostmanCollection);
}
