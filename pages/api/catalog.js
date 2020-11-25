import _ from 'lodash';
import {
  getCatalogItemDetails,
  getCatalogItemPricesByItemCodes,
  getCatalogItemAttributesByItemCodes,
} from '../../lib/catalog';

export default async function handler(req, res) {
  // const catalogItems = await getCatalogItems()
  const catalogItems = await getCatalogItemDetails(
    req.query.id,
    req.query.query
  );
  let data = catalogItems.data.pageContent;
  var sortByItemCode = function (obj) {
    return obj.item.itemId.itemCode;
  };
  let items = _.sortBy(data, sortByItemCode);
  catalogItems.data.pageContent = items;
  // let items = catalogItems.data.pageContent;
  // console.log(items);
  // let itemsObject = {};
  // let itemCodes = [];
  // items.forEach((item) => {
  //   itemCodes.push({ "itemCode": item.itemId.itemCode });
  //   itemsObject[item.itemId.itemCode] = item;
  // });
  // const prices = await getCatalogItemPricesByItemCodes(req.query.id, itemCodes)
  // prices.data.itemPrices.forEach((itemPrice) => {
  //   itemsObject[itemPrice.priceId.itemCode]['price'] = itemPrice;
  // })
  // const attributes = await getCatalogItemAttributesByItemCodes(req.query.id, itemCodes)
  // attributes.data.itemAttributes.forEach((itemAttribute) => {
  //   itemsObject[itemAttribute.itemAttributesId.itemCode]['attributes'] = itemAttribute;
  // })

  res.json(catalogItems);
}
