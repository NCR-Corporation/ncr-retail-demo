import { createGroup, getHomepageGroups, getGroupById } from '~/lib/groups';
import { getHomepageCatalogItemsByGroup } from '~/lib/catalog';
import _ from 'lodash';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);
    let result = await createGroup(body);
    res.json(result);
  } else if (req.method === 'GET') {
    let logs = [];
    let homepageGroup = await getHomepageGroups('Homepage');
    if (homepageGroup && homepageGroup.status == 200 && homepageGroup.data && homepageGroup.data.pageContent.length > 0) {
      logs.push(homepageGroup.log);
      let homepageGroups = homepageGroup.data.pageContent[0].tag;
      let homepageGroupsArray = homepageGroups.split(', ');
      let homepageContent = [];
      const promises = homepageGroupsArray.map(async (group) => {
        let homepage = await getHomepageCatalogItemsByGroup(req.query.site, group);
        logs.push(homepage.log);
        let catalog = [];
        for (let index = 0; index < homepage.data.pageContent.length; index++) {
          const element = homepage.data.pageContent[index];
          if (element.item.status == 'ACTIVE') catalog.push(element);
        }
        homepage.data.pageContent = catalog;
        homepage.data.totalResults = catalog.length;
        let currentGroup = await getGroupById(group);
        logs.push(currentGroup.log);
        homepageContent.push({
          group: currentGroup,
          catalog: homepage
        });
      });
      await Promise.all(promises);
      let home = _.sortBy(homepageContent, function (e) {
        return e.group.data.groupId.groupCode;
      });
      res.json({ status: 200, home, logs });
    } else {
      res.status(homepageGroup.status).json(homepageGroup);
    }
  }
}
