import { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
const FindStoreModalStore = ({ toggle, setUserStore, site }) => {
  const [addingUserStore, setAddingUserStore] = useState(false);
  return (
    <Row className="py-4 bg-light mb-2" key={site.id}>
      {site.address && (
        <Col sm="6">
          <p className="h5">{site.siteName}</p>
          <small className="muted">
            {site.address.street}, {site.address.city}, {site.address.state} {site.address.postalCode}
          </small>
          <p className="m-0">
            <small>
              <a className="muted" href={`http://maps.google.com/?q=${site.address.street} ${site.address.city} ${site.address.state} ${site.address.postalCode}`}>
                Directions
              </a>
            </small>
          </p>
        </Col>
      )}
      <Col sm="3">{site.distanceTo && <p className="h6">{parseInt(site.distanceTo)} miles away</p>}</Col>
      <Col sm="3">
        <Button
          color={addingUserStore ? 'success' : 'primary'}
          className={`${addingUserStore && 'fade-btn'}`}
          onClick={() => {
            setAddingUserStore(true);
            setUserStore(site);
          }}
          onAnimationEnd={() => {
            setAddingUserStore(false);
            if (toggle) {
              toggle();
            }
          }}
        >
          {addingUserStore ? (
            <div>
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
              {'  '}Your Store
            </div>
          ) : (
            'Set as My Store'
          )}
        </Button>
      </Col>
    </Row>
  );
};

export default FindStoreModalStore;
