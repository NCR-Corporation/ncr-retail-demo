import { getCartById, getCartItemsById, deleteCart } from '~/lib/cart';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let cartId = req.query.params[1];
  if (req.method == 'DELETE') {
    const result = await deleteCart(siteId, cartId);
    res.status(result.status).json({ result, logs: [result.log] });
  } else {
    const cart = await getCartById(siteId, cartId);
    if (cart.status !== 200) {
      res.status(cart.status).json(cart);
    }
    const cartItems = await getCartItemsById(siteId, cartId);
    if (cartItems.status !== 200) {
      res.status(cartItems.status).json(cartItems);
    }
    res.status(cartItems.status).json({ cart, cartItems, logs: [cart.log, cartItems.log] });
  }
}
