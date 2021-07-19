import { getCartById, getCartItemsById, deleteCart } from '~/lib/cart';
let logs = [];

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let cartId = req.query.params[1];
  if (req.method == 'DELETE') {
    const result = await deleteCart(siteId, cartId);
    logs.push(result.log);
    res.json({ status: 200, result, logs });
  } else {
    console.log(cartId, siteId);
    const cart = await getCartById(siteId, cartId);
    logs.push(cart.log);
    const cartItems = await getCartItemsById(siteId, cartId);
    logs.push(cartItems.log);
    res.json({ status: 200, cart, cartItems, logs });
  }
}
