import { resetAllData } from '~/lib/reset';

export default async function handler(req, res) {
  await resetAllData();
  res.json({});
}
