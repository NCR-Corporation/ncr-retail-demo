import { getAllCategoryNodes } from './category';
import { getAllSitesAndData } from './sites';
import { getCatalogItems, getSiteCatalogItemPricesByItemCodes, getSiteCatalogItemAttributesByItemCodes } from './catalog';

export async function exportAllData() {
  let categoryNodes = await getAllCategoryNodes(true);
  let categories = [];
  categoryNodes.forEach((element) => {
    delete element.children;
    let locale = element.title.locale;
    let value = element.title.value;
    element.title = [
      {
        locale: locale,
        value: value
      }
    ];
    categories.push(element);
  });

  let siteNodes = await getAllSitesAndData();
  let sites = siteNodes.data.pageContent;

  let catalogNodes = await getCatalogItems();
  let catalog = catalogNodes.data.pageContent;

  let itemCodes = [];
  let items = [];
  catalog.forEach((element) => {
    itemCodes.push({ itemCode: element.itemId.itemCode });
    let shortDescription = element.shortDescription.value;
    let longDescription = element.longDescription.value;
    let shortLocale = element.shortDescription.locale;
    let longLocale = element.longDescription.locale;
    element.shortDescription = [
      {
        locale: shortLocale,
        value: shortDescription
      }
    ];
    element.longDescription = [
      {
        locale: longLocale,
        value: longDescription
      }
    ];
    items.push(element);
  });
  let itemAttributesArray = [];
  let itemPricesArray = [];
  let sitesFormatted = [];
  let importId = new Date().toISOString().replace(/:/gi, '-').replace(/\./gi, '-');
  const promise = sites.map(async (element) => {
    let itemCodesObj = {};
    itemCodesObj.itemIds = itemCodes;
    let itemPrices = await getSiteCatalogItemPricesByItemCodes(element.id, itemCodesObj);
    let itemAttributes = await getSiteCatalogItemAttributesByItemCodes(element.id, itemCodesObj);
    itemPricesArray = itemPricesArray.concat(itemPrices.data.itemPrices);
    itemAttributesArray = itemAttributesArray.concat(itemAttributes.data.itemAttributes);

    sitesFormatted.push({
      importId: importId,
      id: element.id,
      enterpriseUnitName: element.enterpriseUnitName,
      siteName: element.siteName,
      description: element.description ? element.description.replace(/,/gi, ',') : '',
      status: element.status,
      latitude: element.coordinates.latitude,
      longitude: element.coordinates.longitude,
      parentEnterpriseUnitId: element.parentEnterpriseUnitId ?? '',
      timeZone: element.timeZone ?? '',
      contactName: element.contact ? element.contact.contactPerson : '',
      contactPhoneNumber: element.contact ? element.contact.phoneNumber : '',
      contactPhoneNumberCountryCode: element.contact ? element.contact.phoneNumberContryCode : '',
      currency: element.currency ?? '',
      addressCity: element.address.city,
      addressCountry: element.address.country,
      addressPostalCode: element.address.postalCode,
      addressState: element.address.state,
      addressStreet: element.address.street,
      lockStatus: element.lockStatus ?? '',
      referenceId: element.referenceId ?? ''
    });
  });
  await Promise.all(promise);

  let itemAttributesResult = [];
  itemAttributesArray.forEach((element) => {
    delete element['auditTrail'];
    itemAttributesResult.push(element);
  });

  let itemPricesResult = [];
  itemPricesArray.forEach((element) => {
    delete element['auditTrail'];
    itemPricesResult.push(element);
  });

  // Convert sites to csv format.
  let fields = Object.keys(sitesFormatted[0]);
  var csv = sitesFormatted.map(function (row) {
    return fields
      .map(function (fieldName) {
        return row[fieldName];
      })
      .join(',');
  });
  csv = csv.join(',');

  return {
    categories,
    sites: csv,
    items: items,
    itemAttributes: itemAttributesResult,
    itemPrices: itemPricesResult
  };
}
