import {
  createCatalogItems,
  updateSiteCatalogItemAttributesByItemCode,
} from '~/lib/catalog';

export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  console.log('the body', body);
  // let groups = body.groups;
  delete body.groups;
  // let itemAttributes = {
  //   version: body.version,
  //   groups
  // }
  // let updateItemAttributes = await updateSiteCatalogItemAttributesByItemCode(body.itemId.itemCode)
  let itemsBody = { items: [body] };
  let response = await createCatalogItems(itemsBody);
  res.json(response);
}
