import { getById } from '~/lib/sites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Container } from 'reactstrap';
import FindStoreMap from '~/components/public/sites/FindStoreMap';
import Layout from '~/components/public/Layout';

export default function Site({ site }) {
  return (
    <Layout logs={site.log}>
      <Container className="pb-4">
        <div className="py-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faStoreAlt} size="3x" />
            <div className="ml-4">
              <h2 className="mb-0">{site.data.siteName}</h2>
              <small className="text-muted">
                {site.data.address.street} {site.data.address.city}, {site.data.address.state} {site.data.address.postalCode}
              </small>
            </div>
          </div>
          <a target="_blank" href={`https://maps.google.com/?ll=${site.data.coordinates.latitude},${site.data.coordinates.longitude}`} className="btn btn-outline-primary" rel="noreferrer">
            Directions
          </a>
        </div>
        <Row>
          <Col md={6}>
            {site.data.description && <p>{site.data.description}</p>}
            <h5>Store Hours:</h5>
            <p>Coming Soon</p>
          </Col>
          <Col md={6}>
            <FindStoreMap coordinates={site.data.coordinates} sites={[site.data]} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const site = await getById(context.params.id);
  return {
    props: {
      site
    }
  };
}
