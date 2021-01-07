import { getCatalogItems } from '~/lib/catalog';

let logs = [];

export default async function handler(req, res) {
  const catalog = await getCatalogItems();
  logs.push(catalog.log);
  res.json({ catalog, logs });
}
