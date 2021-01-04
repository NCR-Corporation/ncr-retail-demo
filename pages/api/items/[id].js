import { createCatalogItems } from '~/lib/catalog';

export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  delete body.groups;
  let itemsBody = { items: [body] };
  let response = await createCatalogItems(itemsBody);
  res.json(response);
}
