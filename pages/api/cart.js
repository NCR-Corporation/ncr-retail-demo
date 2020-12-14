import { createCart, addItemToCart } from '~/lib/cart';
export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  let cart = await createCart(body.siteId);
  console.log();
  let location = cart.headers.get('location');
  let etag = cart.headers.get('ETag');
  let cartId = location.split('/')[2];
  let items = body.cart.items;

  const promises = Object.keys(items).map(async (key) => {
    console.log(items[key]);
    let obj = {
      itemId: key,
      scanData: key,
      quantity: {
        unitOfMeasure: 'EA', // ???
        value: parseFloat(items[key].quantity),
      },
    };
    await addItemToCart(body.siteId, cartId, etag, obj);
  });
  await Promise.all(promises);
  res.json({ etag, location: cartId });
}
