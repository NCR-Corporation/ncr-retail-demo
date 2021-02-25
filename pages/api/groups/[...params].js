import { getCatalogItemsByGroup } from '~/lib/catalog';
import { getGroupById } from '~/lib/groups';

let logs = [];

export default async function handler(req, res) {
  let siteId = req.query.params[0];
  let groupId = req.query.params[1];
  let groupItems = await getCatalogItemsByGroup(siteId, groupId);
  let group = await getGroupById(groupId);
  logs.push(groupItems.log);
  logs.push(group.log);
  res.json({ status: 200, groupItems, group, logs });
}
