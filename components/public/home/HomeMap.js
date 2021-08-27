import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useSites from '~/lib/hooks/useSites';
import { geolocated } from 'react-geolocated';
import FindStoreMap from '~/components/public/sites/FindStoreMap';
import { Row, Col } from 'reactstrap';

const HomeMap = () => {
  const { data, isLoading, isError } = useSites();

  return !isLoading && !isError ? (
    <Row noGutters={true}>
      <Col md={4} lg={3}>
        <div className="p-4 bg-lighter text-white h-100" style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}>
          <h2 className="h6 brand-primary text-uppercase" style={{ fontWeight: '600' }}>
            Our Stores
          </h2>
          <Row className="list-group-flush list-group" noGutters={true}>
            {data.response.data.pageContent.map((element) => (
              <Col
                xs={12}
                style={{ background: 'none' }}
                className="pl-0 text-darker text-left d-flex justify-content-between align-items-center text-decoration-none list-group-item"
                tag="a"
                href={`/sites/${element.id}`}
                key={element.id}
              >
                <div>
                  <p className="m-0">{element.siteName}</p>
                  <small className="text-muted">{element.address.street}</small>
                </div>
                <FontAwesomeIcon icon={faChevronRight} size="1x" className="pl-1" />
              </Col>
            ))}
          </Row>
        </div>
      </Col>
      <Col xs={12} md={8} lg={9}>
        <FindStoreMap sites={data.response.data.pageContent} coordinates={{}} />
      </Col>
    </Row>
  ) : (
    <>{JSON.stringify(isError)}</>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(HomeMap);
