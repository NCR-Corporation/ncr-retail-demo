import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const SiteMarker = ({ onMarkerClick, showInfoWindow, site }) => (
  <div onClick={onMarkerClick}>
    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
    {showInfoWindow && <div>{site.siteName}</div>}
  </div>
);

const FindStoreMap = ({ coordinates, sites, setUserStore }) => {
  const defaultProps = {
    center: {
      lat:
        coordinates && coordinates.latitude ? coordinates.latitude : 33.7791029,
      lng:
        coordinates && coordinates.longitude
          ? coordinates.longitude
          : -84.3917398,
    },
    zoom: 11,
  };

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = (site) => {
    setShowInfoWindow(true);
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '75vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDOeae3mJn5fjVDyk6lW4cdYHdF0VVkrkE',
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {sites &&
          sites.length > 0 &&
          sites.map((site) => (
            <SiteMarker
              key={site.id}
              lat={site.coordinates.latitude}
              lng={site.coordinates.longitude}
              site={site}
              onMarkerClick={() => handleMarkerClick(site)}
              onMarkerHover={() => console.log('hover')}
              setUserStore={setUserStore}
              // showInfoWindow={showInfoWindow}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default FindStoreMap;
