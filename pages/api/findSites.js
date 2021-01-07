// This probably can be under sites.js...but this was quicker.
import haversine from 'haversine';
import _ from 'lodash';
import { findNearby } from '~/lib/sites';
let logs = [];

export default async function handler(req, res) {
  if (req.query.latitude && req.query.longitude) {
    let response = await findNearby(req.query.latitude, req.query.longitude);
    logs.push(response.log);
    if (response.status == 200) {
      let sites = response.data.sites;
      let activeSites = [];
      const start = {
        latitude: req.query.latitude,
        longitude: req.query.longitude,
      };
      sites.forEach((site) => {
        let end = {
          latitude: site.coordinates.latitude,
          longitude: site.coordinates.longitude,
        };
        site['distanceTo'] = haversine(start, end, { unit: 'mile' });
        if (site.status == 'ACTIVE') {
          activeSites.push(site);
        }
      });
      let orderedSites = _.orderBy(activeSites, ['distanceTo'], ['asc']);
      response.data.sites = orderedSites;
      res.json({ ...response, logs });
    } else {
      res.json({ ...response, logs });
    }
  } else {
    let response = await findNearby();
    logs.push(response.log);
    res.json({ ...response, logs });
  }
}
