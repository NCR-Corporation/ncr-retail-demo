import { getHomepageGroups, getGroupById } from '~/lib/groups';
import { getHomepageCatalogItemsByGroup } from '~/lib/catalog';
import _ from 'lodash';

export default async function handler(req, res) {
  let homepageGroup = await getHomepageGroups('Homepage');
  if (homepageGroup.data && homepageGroup.data.pageContent.length > 0) {
    let homepageGroups = homepageGroup.data.pageContent[0].tag;
    let homepageGroupsArray = homepageGroups.split(', ');
    let homepageContent = [];
    const promises = homepageGroupsArray.map(async (group) => {
      let homepage = await getHomepageCatalogItemsByGroup(
        req.query.site,
        group
      );
      let catalog = [];
      for (let index = 0; index < homepage.data.pageContent.length; index++) {
        const element = homepage.data.pageContent[index];
        if (element.item.status == 'ACTIVE') catalog.push(element);
      }
      homepage.data.pageContent = catalog;
      homepage.data.totalResults = catalog.length;
      let currentGroup = await getGroupById(group);
      homepageContent.push({
        group: currentGroup,
        catalog: homepage,
      });
    });
    await Promise.all(promises);
    let home = _.sortBy(homepageContent, function (e) {
      return e.group.data.groupId.groupCode;
    });
    res.json({ status: 200, home });
  } else {
    res.json({ status: 200 });
  }
}
