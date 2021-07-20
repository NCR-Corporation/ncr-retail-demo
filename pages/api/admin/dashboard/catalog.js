import { getCatalogItems } from '~/lib/catalog';

export default async function handler(_, res) {
  const catalog = await getCatalogItems();
  res.status(catalog.status).json({ catalog, logs: [catalog.log] });
}
