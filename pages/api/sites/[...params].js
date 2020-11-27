import { getSiteCatalogItemDetails } from '~/lib/catalog';
import { getById } from '~/lib/sites';

export default async function handler(req, res) {
  const site = await getById(req.query.params[0]);
  const catalog = await getSiteCatalogItemDetails(req.query.params[0]);
  res.json({ site: site.data, catalog: catalog });
}
