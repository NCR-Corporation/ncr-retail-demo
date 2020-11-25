import React, { useEffect, useState, useContext } from 'react';
import { geolocated } from 'react-geolocated';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import { UserStoreContext } from '~/context/AppContext';

const FindStoreModal = (props) => {
  const { modalProp, toggle, coords } = props;

  const { userStore, setUserStore } = useContext(UserStoreContext);

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
            setSites(data.data.sites);
          });
      } else {
        fetch(`/api/findSites`)
          .then((res) => res.json())
          .then((data) => {
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
            <div>Nope</div>
          ) : !props.isGeolocationEnabled ? (
            <div>Not enabled</div>
          ) : props.coords ? (
            <div></div>
          ) : (
            <div>Getting</div>
          )}
          <small>
            {coordinates
              ? `Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`
              : ''}
          </small>
          {sites && sites.length > 0 && (
            <div>
              {sites.map((site) => (
                <Row className="mt-4 mb-4" key={site.id}>
                  <Col sm="6">
                    <p className="h5">{site.siteName}</p>
                    <small className="muted">
                      {site.address.street}, {site.address.city},{' '}
                      {site.address.state} {site.address.postalCode}
                    </small>
                  </Col>
                  <Col sm="3">
                    {site.distanceTo && (
                      <p className="h5">
                        {parseInt(site.distanceTo)} miles away
                      </p>
                    )}
                  </Col>
                  <Col sm="3">
                    <Button
                      color="primary"
                      onClick={() => {
                        setUserStore(site);
                        toggle();
                      }}
                    >
                      Set as My Store
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
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
