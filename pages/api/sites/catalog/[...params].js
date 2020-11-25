import {
  updateCatalogItemPricesByItemCode,
  updateCatalogItemAttributesByItemCode,
} from '../../../../lib/catalog';

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

  let updatePrice = await updateCatalogItemPricesByItemCode(
    siteId,
    itemId,
    body.priceId,
    itemPrices
  );
  let updateAttributes = await updateCatalogItemAttributesByItemCode(
    siteId,
    itemId,
    itemAttributes
  );

  res.json({ updatePrice, updateAttributes });
}
