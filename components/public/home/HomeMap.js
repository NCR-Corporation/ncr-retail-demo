import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useSites from '~/lib/hooks/useSites';
import { geolocated } from 'react-geolocated';
import FindStoreMap from '~/components/public/FindStoreMap';
import { ListGroup, ListGroupItem } from 'reactstrap';

const HomeMap = () => {
  const { data, isLoading, isError } = useSites();

  return !isLoading && !isError ? (
    <div className="d-flex">
      <div
        className="p-4 w-33 bg-lighter text-white"
        style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}
      >
        <h6
          className="brand-primary text-uppercase"
          style={{ fontWeight: '600' }}
        >
          Our Stores
        </h6>
        <ListGroup flush>
          {data.data.pageContent.map((element) => (
            <ListGroupItem
              style={{ background: 'none' }}
              className="pl-0 text-darker text-left d-flex justify-content-between align-items-center text-decoration-none"
              tag="a"
              href={`/sites/${element.id}`}
            >
              <div>
                <p className="m-0">{element.siteName}</p>
                <small className="text-muted">{element.address.street}</small>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                size="1x"
                className="pl-1"
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="flex-fill">
        <FindStoreMap sites={data.data.pageContent} coordinates={{}} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(HomeMap);
