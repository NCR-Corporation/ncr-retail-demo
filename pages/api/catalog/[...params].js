import { getCatalogItem, getCatalogItemPricesByItemCodes } from '../../../lib/catalog';
import { getCatalogItemCategoryAncestorsByMerchandiseCategory } from '../../../lib/category';

export default async function handler(req, res) {
  console.log(req.query);
  const catalogItem = await getCatalogItem(req.query.params[0], req.query.params[1]);
  let itemsObject = {};
  let itemCodes = [];
  itemCodes.push({ "itemCode": req.query.params[1] });
  itemsObject[req.query.params[1]] = catalogItem.data;
  const prices = await getCatalogItemPricesByItemCodes(req.query.params[0], itemCodes)
  console.log('prices', prices);
  prices.data.itemPrices.forEach((itemPrice) => {
    itemsObject[itemPrice.priceId.itemCode]['price'] = itemPrice;
  })
  const ancestors = await getCatalogItemCategoryAncestorsByMerchandiseCategory(catalogItem.data.merchandiseCategory.nodeId);
  itemsObject[req.query.params[1]]['categories'] = ancestors.data.nodes;

  res.json(itemsObject);
}