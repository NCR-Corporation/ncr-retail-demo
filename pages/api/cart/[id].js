import { addItemToCart, removeItemInCartById } from '~/lib/cart';

export default async function handler(req, res) {
  if (req.method == 'DELETE') {
    let body = JSON.parse(req.body);
    const result = await removeItemInCartById(body.siteId, body.cartId, body.lineItemId);
    res.status(result.status).json({ result, logs: [result.log] });
  } else {
    let body = JSON.parse(req.body);
    const result = await addItemToCart(body.siteId, body.cartId, body.etag, body.item);
    res.status(result.status).json({ result, logs: [result.log] });
  }
}
