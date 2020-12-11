import { createSite } from '~/lib/sites';

export default async function handler(req, res) {
  let param = JSON.parse(req.body)['param'];
  switch (param) {
    case 'taxAuthority':
      break;
    case 'taxRate':
      break;
    case 'tender':
      break;
  }
  let response = await createSite(JSON.parse(req.body));
  res.json(response);
}
