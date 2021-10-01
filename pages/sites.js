import { useEffect, useState, useContext } from 'react';
import { geolocated } from 'react-geolocated';
import { Col, Container, Row } from 'reactstrap';
import { UserStoreContext } from '~/context/userStore';
import Layout from '~/components/public/Layout';
import FindStoreMap from '~/components/public/sites/FindStoreMap';
import StoreListItem from '~/components/public/sites/StoreListItem';

const Sites = (props) => {
  const { coords } = props;
  const { setUserStore } = useContext(UserStoreContext);
  const [coordinates, setCoordinates] = useState(coords);
  const [sites, setSites] = useState();
  const [logs, setLogs] = useState([]);
  if (props.coords && !coordinates) {
    setCoordinates(props.coords);
  }

  useEffect(async () => {
    // Get locations near user.
    const fetchData = async () => {
      if (props.coords && coordinates.latitude) {
        fetch(`/api/findSites?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)
          .then((res) => res.json())
          .then((data) => {
            const { logs, response } = data;
            setLogs(logs);
            setSites(response.data.pageContent);
          });
      } else {
        fetch(`/api/findSites`)
          .then((res) => res.json())
          .then((body) => {
            const { logs, response } = body;
            setLogs(logs);
            setSites(response.data.pageContent);
          });
      }
    };
    fetchData();
  }, [coordinates]);

  return (
    <Layout logs={logs} title="Sites">
      <Container className="my-4 flex-grow-1">
        <h1>Stores</h1>
        <Row>
          <Col md="6">
            <FindStoreMap sites={sites} coordinates={coords} setUserStore={setUserStore} />
          </Col>
          <Col md="6">
            <ul>
              {sites &&
                sites.length > 0 &&
                sites.map((site) => {
                  if (site.address && site.status == 'ACTIVE') {
                    return <StoreListItem site={site} setUserStore={setUserStore} key={site.id} />;
                  }
                })}
            </ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Sites);
