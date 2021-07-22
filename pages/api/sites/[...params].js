import { getSiteCatalogItemDetails } from '~/lib/catalog';
import { getById } from '~/lib/sites';

export default async function handler(req, res) {
  const site = await getById(req.query.params[0]);
  if (site.status !== 200) {
    res.status(site.status).json(site);
  }
  const catalog = await getSiteCatalogItemDetails(req.query.params[0]);
  if (catalog.status !== 200) {
    res.status(catalog.status).json(catalog);
  }
  res.status(200).json({ site: site.data, catalog: catalog, logs: [site.log, catalog.log] });
}
