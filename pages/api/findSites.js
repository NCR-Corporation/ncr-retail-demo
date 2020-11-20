// This probably can be under sites.js...but this was quicker.
import haversine from 'haversine';
import _ from 'lodash';
import { findNearby } from '../../lib/sites';

export default async function handler(req, res) {
  if (req.query.latitude && req.query.longitude) {
    let response = await findNearby(req.query.latitude, req.query.longitude)
    let sites = response.data.sites;
    const start = {
      latitude: req.query.latitude,
      longitude: req.query.longitude
    }
    sites.forEach(site => {
      let end = {
        latitude: site.coordinates.latitude,
        longitude: site.coordinates.longitude
      };
      site['distanceTo'] = haversine(start, end, { unit: 'mile' })
    })
    let orderedSites = _.orderBy(sites, ['distanceTo'], ['asc']);
    response.data.sites = orderedSites;
    res.json(response);
  } else {
    let response = await findNearby()
    res.json(response);
  }
}