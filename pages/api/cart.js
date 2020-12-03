import { createCart, addItemToCart } from '~/lib/cart';
export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  let cart = await createCart(body.siteId);
  let location = cart.headers.get('location');
  let etag = cart.headers.get('ETag');
  let cartId = location.split('/')[2];
  console.log(body);
  let items = body.cart.items;
  console.log('the items', items);
  let cartItems = [];

  const promises = Object.keys(items).map(async (key) => {
    console.log(key);
    let obj = {
      // itemId: key,
      scanData: key,
      quantity: {
        unitOfMeasure: 'EA', // ???
        value: items[key].quantity,
      },
    };
    let cartItemAdded = await addItemToCart(body.siteId, cartId, obj);
    console.log(obj);
    cartItems.push(cartItemAdded);
  });
  await Promise.all(promises);
  console.log(cartItems);
  // res.json({ location, etag });
  res.json({});
}
