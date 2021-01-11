// This probably can be under sites.js...but this was quicker.
import haversine from 'haversine';
import _ from 'lodash';
import { findNearby, getSites } from '~/lib/sites';

export default async function handler(req, res) {
  let logs = [];
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
      if (orderedSites.length == 0) {
        let response = await findNearby();
        res.json(response);
      } else {
        response.data.pageContent = orderedSites;
        res.json(response);
      }
    } else {
      res.json({ ...response, logs });
    }
  } else {
    let response = await findNearby();
    logs.push(response.log);
    res.json({ ...response, logs });
  }
}
