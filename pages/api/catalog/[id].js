import { getCatalogItemByItemCode, getCatalogItemPricesByItemCodes, getCatalogItemAttributesByItemCodes } from '../../../lib/catalog';
// import { getCatalogItemCategoryAncestorsByMerchandiseCategory } from '../../../lib/category';

export default async function handler(req, res) {
  // console.log(req);
  const catalogItem = await getCatalogItemByItemCode(req.query.id);
  let itemsObject = {};
  // let itemCodes = [];
  // itemCodes.push({ "itemCode": req.query.params[1] });
  itemsObject[req.query.id] = catalogItem.data;
  // const prices = await getCatalogItemPricesByItemCodes(req.query.params[0], itemCodes)
  // prices.data.itemPrices.forEach((itemPrice) => {
  //   itemsObject[itemPrice.priceId.itemCode]['price'] = itemPrice;
  // })
  // const attributes = await getCatalogItemAttributesByItemCodes(req.query.params[0], itemCodes);
  // attributes.data.itemAttributes.forEach((itemAttribute) => {
  //   itemsObject[itemAttribute.itemAttributesId.itemCode]['attributes'] = itemAttribute;
  // })
  // const ancestors = await getCatalogItemCategoryAncestorsByMerchandiseCategory(catalogItem.data.merchandiseCategory.nodeId);
  // itemsObject[req.query.params[1]]['categories'] = ancestors.data.nodes;

  res.json(catalogItem.data);
}