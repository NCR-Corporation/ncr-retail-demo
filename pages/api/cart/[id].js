import { addItemToCart } from '~/lib/cart';

export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  const result = await addItemToCart(
    body.siteId,
    body.cartId,
    body.etag,
    body.item
  );
  res.json(result);
}
