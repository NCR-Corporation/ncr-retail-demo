import { getHomepageCatalogItems } from '../../lib/catalog';

export default async function handler(req, res) {
  let response = await getHomepageCatalogItems();
  res.json(response);
}
