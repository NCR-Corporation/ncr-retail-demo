import { addItemToCart, removeItemInCartById } from '~/lib/cart';

export default async function handler(req, res) {
  console.log('here');
  if (req.method == 'DELETE') {
    let body = JSON.parse(req.body);
    const result = await removeItemInCartById(
      body.siteId,
      body.cartId,
      body.lineItemId
    );
    console.log(result);
    res.json(result);
  } else {
    let body = JSON.parse(req.body);
    const result = await addItemToCart(
      body.siteId,
      body.cartId,
      body.etag,
      body.item
    );
    res.json(result);
  }
}
