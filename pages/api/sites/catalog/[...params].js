import uniqid from 'uniqid';
import { updateSiteCatalogItemPricesByItemCode, updateSiteCatalogItemAttributesByItemCode } from '~/lib/catalog';

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
          value: body.shortDescription
        }
      ]
    },
    longDescription: {
      values: [
        {
          locale: 'en-US',
          value: body.longDescription
        }
      ]
    },
    status: body.status
  };

  if (body.groups) {
    itemAttributes['groups'] = [
      {
        groupCode: body.groups
      }
    ];
  }

  let itemPrices = {
    version: body.version,
    price: body.price,
    currency: body.currency,
    effectiveDate: body.effectiveDate,
    endDate: '2100-12-17T05:00:00Z',
    status: body.status,
    basePrice: true,
    dynamicAttributes: [
      {
        type: 'retail-price',
        attributes: [
          {
            key: 'UOM',
            value: 'EA'
          },
          {
            key: 'UNITS',
            value: '1'
          }
        ]
      }
    ]
  };
  let priceId = body.priceId !== '' ? body.priceId : uniqid();

  let updatePrice = await updateSiteCatalogItemPricesByItemCode(siteId, itemId, priceId, itemPrices);
  let updateAttributes = await updateSiteCatalogItemAttributesByItemCode(siteId, itemId, itemAttributes);

  res.status(200).json({ updatePrice, updateAttributes, logs: [updatePrice.log, updateAttributes.log] });
}
