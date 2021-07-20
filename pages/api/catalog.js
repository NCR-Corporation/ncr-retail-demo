import _ from 'lodash';
import { getSiteCatalogItemDetails } from '~/lib/catalog';

export default async function handler(req, res) {
  const catalogItems = await getSiteCatalogItemDetails(req.query.id, req.query.query);
  if (catalogItems.status !== 200) {
    res.status(catalogItems.status).json(catalogItems);
  }
  let data = catalogItems.data.pageContent;
  var sortByItemCode = function (obj) {
    return obj.item.itemId.itemCode;
  };
  let items = _.sortBy(data, sortByItemCode);
  catalogItems.data.pageContent = items;
  res.status(200).json({ catalogItems, logs: [catalogItems.log] });
}
