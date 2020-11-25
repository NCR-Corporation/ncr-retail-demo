import { createItemPricesForItem } from '~/lib/item-prices';

export default async function handler(req, res) {
  let response = await createItemPricesForItem(req.query.id, req.body);
  res.json(response);
}
