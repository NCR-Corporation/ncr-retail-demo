import uniqid from 'uniqid';
import {
  updateSiteCatalogItemPricesByItemCode,
  updateSiteCatalogItemAttributesByItemCode,
} from '~/lib/catalog';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let itemId = req.query.params[1];
  let body = JSON.parse(req.body);

  let itemAttributes = {
    version: body.version,
    imageUrls: [body.imageUrl],
    shortDescription: {
      values: [
        {
          locale: 'en-US',
          value: body.shortDescription,
        },
      ],
    },
    longDescription: {
      values: [
        {
          locale: 'en-US',
          value: body.longDescription,
        },
      ],
    },
    status: body.status,
  };

  let itemPrices = {
    version: body.version,
    price: body.price,
    currency: body.currency,
    effectiveDate: body.effectiveDate,
    status: body.status,
  };
  let priceId = body.priceId !== '' ? body.priceId : uniqid();
  let updatePrice = await updateSiteCatalogItemPricesByItemCode(
    siteId,
    itemId,
    priceId,
    itemPrices
  );
  console.log(updatePrice);
  let updateAttributes = await updateSiteCatalogItemAttributesByItemCode(
    siteId,
    itemId,
    itemAttributes
  );

  res.json({ updatePrice, updateAttributes });
}
