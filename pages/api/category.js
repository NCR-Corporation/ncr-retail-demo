import { getAllCategoryNodes, createCategory } from '~/lib/category';
import _ from 'lodash';

export default async function handler(req, res) {
  let logs = [];
  if (req.method === 'GET') {
    let categoryResponse = await getAllCategoryNodes(false, false);
    let { categories, log } = categoryResponse;
    logs = log;
    if (categories && categories.length > 0) {
      categories.forEach((element) => {
        if (element.children.array.length > 0) {
          let children = element.children.array;
          let sortedC = [];
          children.forEach((child) => {
            if (element.children[child].children) {
              let grandchildren = element.children[child].children;
              let sortedGC = [];
              Object.keys(grandchildren).forEach((index) => sortedGC.push(grandchildren[index]));
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
    res.status(200).json({ categories, logs });
  } else if (req.method === 'PUT') {
    let response = await createCategory(JSON.parse(req.body));
    res.status(response.status).json({ response, logs: [response.log] });
  }
}
