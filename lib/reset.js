import { getCatalogItems, createOrUpdateCatalogItem } from './catalog';
import { getAllCategoryNodes, updateCategory } from './category';
import { getAllSitesAndData, updateSite } from './sites';

export async function resetAllData() {
  let catalog = await getCatalogItems();

  const catalogPromise = catalog.data.pageContent.map(async (item) => {
    let version = item.version;
    version = version + 2;
    item['version'] = version;
    item['status'] = 'INACTIVE';
    item['shortDescription'] = { values: [item['shortDescription']] };
    item['longDescription'] = { values: [item['longDescription']] };
    let itemId = item.itemId.itemCode;
    delete item['itemId'];
    await createOrUpdateCatalogItem(itemId, item);
  });

  await Promise.all(catalogPromise);

  let categoryNodes = await getAllCategoryNodes(true);
  let categoryPromise = categoryNodes.map(async (element) => {
    let version = element.version;
    version = version + 2;
    element['version'] = version;
    element['status'] = 'INACTIVE';
    element['title'] = { values: [element.title] };
    delete element['children'];
    let nodes = { nodes: [element] };
    await updateCategory(nodes);
  });

  await Promise.all(categoryPromise);

  let sites = await getAllSitesAndData();

  let sitesPromise = sites.data.pageContent.map(async (site) => {
    site['status'] = 'INACTIVE';
    let siteId = site.id;
    delete site.id;
    await updateSite(siteId, site);
  });

  await Promise.all(sitesPromise);
  return;
}
