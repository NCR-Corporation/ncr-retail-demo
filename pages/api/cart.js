import {
  createCart,
  addItemToCart,
  getCartItemsById,
  updateItemInCartById,
} from '~/lib/cart';
export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  if (body.etag == false || body.location == false) {
    let cart = await createCart(body.siteId);
    let location = cart.headers.get('location');
    let etag = cart.headers.get('ETag');
    let cartId = location.split('/')[2];
    let item = body.item;

    console.log(cartId, etag);

    console.log(item);
    let obj = {
      itemId: item.itemId.itemCode,
      scanData: item.itemId.itemCode,
      quantity: {
        unitOfMeasure: 'EA', // ???
        value: item.quantity,
      },
    };
    await addItemToCart(body.siteId, cartId, etag, obj);
    res.json({ etag, location: cartId });
  } else {
    let cartId = body.location;
    let etag = body.etag;
    let cartItems = await getCartItemsById(body.siteId, cartId);

    let item = body.item;
    let itemId = body.item.itemId.itemCode;
    // Check if we need to update.
    let update = false;
    let pageContent = cartItems.data.pageContent;
    for (let index = 0; index < pageContent.length; index++) {
      const element = pageContent[index];
      if (element.itemId.value == itemId) {
        update = element;
        break;
      }
    }
    if (!update) {
      let obj = {
        itemId: item.itemId.itemCode,
        scanData: item.itemId.itemCode,
        quantity: {
          unitOfMeasure: 'EA', // ???
          value: item.quantity,
        },
      };
      await addItemToCart(body.siteId, cartId, etag, obj);
    } else {
      console.log(item.quantity);
      let updateObj = {
        quantity: {
          unitOfMeasure: 'EA',
          value: update.quantity.value + item.quantity,
        },
      };
      let lineId = update.lineId;
      console.log('the update', updateObj);
      await updateItemInCartById(body.siteId, cartId, etag, lineId, updateObj);
    }
    res.json({ etag, location: cartId });
  }
}
