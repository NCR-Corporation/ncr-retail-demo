import { getCatalogItems } from '~/lib/catalog';

export default async function handler(req, res) {
  const catalog = await getCatalogItems();
  res.json(catalog);
}
