import { getSiteCatalogItemDetails } from '~/lib/catalog';
import { getById } from '~/lib/sites';
let logs = [];

export default async function handler(req, res) {
  const site = await getById(req.query.params[0]);
  logs.push(site.log);
  const catalog = await getSiteCatalogItemDetails(req.query.params[0]);
  logs.push(catalog.log);
  res.json({ site: site.data, catalog: catalog, logs });
}
