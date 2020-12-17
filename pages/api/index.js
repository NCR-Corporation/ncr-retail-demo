import { getHomepageGroups, getGroupById } from '~/lib/groups';
import { getHomepageCatalogItemsByGroup } from '~/lib/catalog';

export default async function handler(req, res) {
  let homepageGroup = await getHomepageGroups('Homepage');
  let homepageGroups = homepageGroup.data.pageContent[0].tag;
  let homepageGroupsArray = homepageGroups.split(', ');
  let homepageContent = {};
  const promises = homepageGroupsArray.map(async (group) => {
    let homepage = await getHomepageCatalogItemsByGroup(req.query.site, group);
    let currentGroup = await getGroupById(group);
    homepageContent[group] = {
      group: currentGroup,
      catalog: homepage,
    };
  });
  await Promise.all(promises);
  res.json({ homepageContent });
}
