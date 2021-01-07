import { createCatalogItems } from '~/lib/catalog';
let logs = [];

export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  delete body.groups;
  let itemsBody = { items: [body] };
  let response = await createCatalogItems(itemsBody);
  logs.push(response.log);
  res.json({ response, logs });
}
