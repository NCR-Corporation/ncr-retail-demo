import { createGroup } from '~/lib/groups';
let logs = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);
    let result = await createGroup(body);
<<<<<<< HEAD
    logs.push(result.log);
    res.json({ result, logs });
=======
    res.json(result);
>>>>>>> main
  }
}
