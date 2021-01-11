import { getAllCategoryNodes, createCategory } from '~/lib/category';
import _ from 'lodash';

export default async function handler(req, res) {
  let logs = [];
  if (req.method === 'GET') {
    let { categories, log } = await getAllCategoryNodes(false, false);
    logs = log;
    if (categories.length > 0) {
      categories.forEach((element) => {
        if (element.children.array.length > 0) {
          let children = element.children.array;
          let sortedC = [];
          children.forEach((child) => {
            if (element.children[child].children) {
              let grandchildren = element.children[child].children;
              let sortedGC = [];
              Object.keys(grandchildren).forEach((index) =>
                sortedGC.push(grandchildren[index])
              );
              sortedGC = _.sortBy(sortedGC, function (c) {
                return c.nodeCode;
              });
              element.children[child].children = sortedGC;
            }
            sortedC.push(element.children[child]);
          });
          sortedC = _.sortBy(sortedC, function (c) {
            return c.nodeCode;
          });
          element.children = sortedC;
        }
      });
      categories = _.sortBy(categories, function (c) {
        return c.nodeCode;
      });
    }
    res.json({ categories, logs, status: 200 });
  } else if (req.method === 'PUT') {
    let response = await createCategory(JSON.parse(req.body));
    logs.push(response.log);
    res.json({ response, logs, status: 200 });
  }
}
