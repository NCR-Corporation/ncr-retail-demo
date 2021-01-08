import React, { useEffect, useState, useContext } from 'react';
import { geolocated } from 'react-geolocated';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { UserStoreContext } from '~/context/userStore';
import FindStoreModalStore from './FindStoreModalStore';

const FindStoreModal = (props) => {
  const { modalProp, toggle, coords } = props;

  const { setUserStore } = useContext(UserStoreContext);
  const [coordinates, setCoordinates] = useState(coords);
  const [sites, setSites] = useState();
  if (props.coords && !coordinates) {
    setCoordinates(props.coords);
  }

  useEffect(async () => {
    // Get locations near user.
    const fetchData = async () => {
      if (props.coords && coordinates.latitude) {
        fetch(
          `/api/findSites?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log('here', data.data.sites);
            setSites(data.data.pageContent);
          });
      } else {
        fetch(`/api/findSites`)
          .then((res) => res.json())
          .then((data) => {
            console.log('hee', data);
            setSites(data.data.pageContent);
          });
      }
    };
    fetchData();
  }, [coordinates]);

  return (
    <div>
      <Modal isOpen={modalProp} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Find a Store</ModalHeader>
        <ModalBody>
          {!props.isGeolocationAvailable ? (
            <div>
              <small className="text-muted">Geolocation is unavailable.</small>
            </div>
          ) : (
            !props.isGeolocationEnabled && (
              <div>
                <small className="text-muted">User location not enabled</small>
              </div>
            )
          )}
          <small>
            {coordinates
              ? `Latitude: ${coordinates.latitude.toFixed(
                  2
                )}, Longitude: ${coordinates.longitude.toFixed(2)}`
              : ''}
          </small>
          {sites && sites.length > 0 && (
            <div>
              {sites.map((site) => (
                <FindStoreModalStore
                  site={site}
                  toggle={toggle}
                  setUserStore={setUserStore}
                  key={site.id}
                />
              ))}
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(FindStoreModal);
