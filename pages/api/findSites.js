// This probably can be under sites.js...but this was quicker.
import { findNearby } from '../../lib/sites';

export default async function handler(req, res) {
  if (req.query.latitude && req.query.longitude) {
    let response = await findNearby(req.query.latitude, req.query.longitude)
    res.json(response);
  } else {
    let response = await findNearby()
    res.json(response);
  }
}