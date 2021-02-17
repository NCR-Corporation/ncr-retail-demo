import _ from 'lodash';
import { getSiteCatalogItemDetails } from '~/lib/catalog';
let logs = [];

export default async function handler(req, res) {
  const catalogItems = await getSiteCatalogItemDetails(
    req.query.id,
    req.query.query
  );
  logs.push(catalogItems.log);
  let data = catalogItems.data.pageContent;
  var sortByItemCode = function (obj) {
    return obj.item.itemId.itemCode;
  };
  let items = _.sortBy(data, sortByItemCode);
  catalogItems.data.pageContent = items;
  res.json({ catalogItems, logs, status: 200 });
}
