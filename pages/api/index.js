import { getHomepageGroups, getGroupById } from '~/lib/groups';
import { getHomepageCatalogItemsByGroup } from '~/lib/catalog';
import Logger from '~/lib/logger';
import _ from 'lodash';

export default async function handler(req, res) {
  let logger = new Logger();
  let homepageGroup = await getHomepageGroups('Homepage');
  let homepageGroups = homepageGroup.data.pageContent[0].tag;
  let homepageGroupsArray = homepageGroups.split(', ');
  let homepageContent = [];
  const promises = homepageGroupsArray.map(async (group) => {
    let homepage = await getHomepageCatalogItemsByGroup(req.query.site, group);
    logger.add(homepage.log);
    let catalog = [];
    for (let index = 0; index < homepage.data.pageContent.length; index++) {
      const element = homepage.data.pageContent[index];
      if (element.item.status == 'ACTIVE') catalog.push(element);
    }
    homepage.data.pageContent = catalog;
    homepage.data.totalResults = catalog.length;
    let currentGroup = await getGroupById(group);
    logger.add(currentGroup.log);
    homepageContent.push({
      group: currentGroup,
      catalog: homepage,
    });
  });
  await Promise.all(promises);
  let home = _.sortBy(homepageContent, function (e) {
    return e.group.data.groupId.groupCode;
  });

  let logs = logger.log;
  logger.reset();

  res.json({ home, logs });
}
