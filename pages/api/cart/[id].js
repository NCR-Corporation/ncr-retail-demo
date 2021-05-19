import { addItemToCart, removeItemInCartById } from '~/lib/cart';
let logs = [];

export default async function handler(req, res) {
  if (req.method == 'DELETE') {
    let body = JSON.parse(req.body);
    const result = await removeItemInCartById(body.siteId, body.cartId, body.lineItemId);
    logs.push(result.log);
    res.json({ result, logs, status: 200 });
  } else {
    let body = JSON.parse(req.body);
    const result = await addItemToCart(body.siteId, body.cartId, body.etag, body.item);
    logs.push(result.log);
    res.json({ result, logs, status: 200 });
  }
}
