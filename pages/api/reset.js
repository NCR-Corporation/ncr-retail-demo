import { resetAllData } from '~/lib/reset';

export default async function handler(_, res) {
  await resetAllData();
  res.json({});
}
