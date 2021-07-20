import { getCatalogItemsByGroup } from '~/lib/catalog';
import { getGroupById } from '~/lib/groups';

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let groupId = req.query.params[1];
  let groupItems = await getCatalogItemsByGroup(siteId, groupId);
  if (groupItems.status !== 200) {
    res.status(groupItems.status).json(groupItems);
  }
  let group = await getGroupById(groupId);
  if (group.status !== 200) {
    res.status(group.status).json(group);
  }
  res.status(groupItems.status).json({ groupItems, group, logs: [groupItems.log, group.log] });
}
