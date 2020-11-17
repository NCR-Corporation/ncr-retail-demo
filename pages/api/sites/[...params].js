import { getCatalogItems, getCatalogItemPricesByItemCodes } from '../../../lib/catalog';
import { getById } from '../../../lib/sites';

export default async function handler(req, res) {
  const site = await getById(req.query.params[0]);
  const catalogItems = await getCatalogItems();
  let itemsObject = {};
  let itemCodes = [];
  catalogItems.data.pageContent.forEach((item) => {
    itemCodes.push({ "itemCode": item.itemId.itemCode });
    itemsObject[item.itemId.itemCode] = item;
  });
  let result = [];
  const prices = await getCatalogItemPricesByItemCodes(req.query.params[0], itemCodes);
  prices.data.itemPrices.forEach((itemPrice) => {
    itemsObject[itemPrice.priceId.itemCode]['price'] = itemPrice;

    result.push(itemsObject[itemPrice.priceId.itemCode]);
    delete itemsObject[itemPrice.priceId.itemCode];
  })

  res.json({ "site": site.data, "siteCatalog": result, "catalog": itemsObject });
}