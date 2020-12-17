import { getHomepageGroups, getGroupById } from '~/lib/groups';
import { getHomepageCatalogItemsByGroup } from '~/lib/catalog';

export default async function handler(req, res) {
  let homepageGroup = await getHomepageGroups('Homepage');
  console.log(homepageGroup);
  let homepageGroups = homepageGroup.data.pageContent[0].tag;
  console.log(homepageGroups);
  let homepageGroupsArray = homepageGroups.split(', ');
  console.log(homepageGroupsArray);
  let homepageContent = {};
  const promises = homepageGroupsArray.map(async (group) => {
    let homepage = await getHomepageCatalogItemsByGroup(req.query.site, group);
    let currentGroup = await getGroupById(group);
    console.log(homepage);
    homepageContent[group] = {
      group: currentGroup,
      catalog: homepage,
    };
  });
  await Promise.all(promises);
  res.json({ homepageContent });
}
