import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { geolocated } from 'react-geolocated';
import { ListGroup, ListGroupItem } from 'reactstrap';

import useSites from '~/lib/swr/useSites';
import FindStoreMap from '~/components/public/sites/FindStoreMap';

const HomeMap = () => {
  const { data, isLoading, isError } = useSites();

  if (isLoading) {
    return <div className="my-5"></div>;
  }

  if (isError) {
    return (
      <div className="my-5">
        <small className="text-muted center">
          {`Uhoh, we've hit an error.`}
          <code>{JSON.stringify(isError.info)}</code>
        </small>
      </div>
    );
  }

  const sites = data.response.data.pageContent;

  return (
    <div className="my-5 d-flex" id="stores">
      <div className="p-4 w-33 bg-lighter text-white rounded-left">
        <h2 className="h6 brand-primary text-uppercase font-weight-bolder">Our Stores</h2>
        <ListGroup flush>
          {sites.map((element) => (
            <ListGroupItem
              style={{ background: 'none' }}
              className="pl-0 text-darker text-left d-flex justify-content-between align-items-center text-decoration-none"
              tag="a"
              href={`/sites/${element.id}`}
              key={element.id}
            >
              <div>
                <p className="m-0">{element.siteName}</p>
                <small className="text-muted">{element.address.street}</small>
              </div>
              <FontAwesomeIcon icon={faChevronRight} size="1x" className="pl-1" />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="flex-fill">
        <FindStoreMap sites={sites} coordinates={{}} />
      </div>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(HomeMap);
