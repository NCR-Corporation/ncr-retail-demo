import { exportAllData } from '../../lib/export';

export default async function handler(req, res) {
  let response = await exportAllData()
  res.json(response);
}