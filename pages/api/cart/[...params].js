import { getCartById } from '~/lib/cart';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let cartId = req.query.params[1];
  const cart = await getCartById(siteId, cartId);
  res.json(cart);
}
