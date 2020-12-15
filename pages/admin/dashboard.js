import Header from '~/components/admin/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faThList,
  faBox,
  faCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  CardTitle,
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
} from 'reactstrap';
import NavigationTabs from '~/components/admin/NavigationTabs';
import useDashboard from '~/lib/hooks/useDashboard';
import Orders from '~/components/admin/orders/Orders';

const Dashboard = () => {
  let { data, isLoading, isError } = useDashboard();
  if (!isLoading && !isError) {
    console.log(data);
  }
  return (
    <div>
      <Header />
      <Container className="my-4 flex-grow-1">
        <NavigationTabs activeTab="dashboard" />
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && (
          <div className="my-4">
            <Row className="text-center">
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faCircle}
                          size="2x"
                          transform="left-3"
                        />
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>0</strong>
                    </CardTitle>
                    <small className="text-muted">total orders</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faCircle}
                          size="2x"
                          transform="left-3"
                        />
                        <FontAwesomeIcon
                          icon={faStore}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{data.sites.data.totalResults}</strong>
                    </CardTitle>
                    <small className="text-muted">operating sites</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faCircle}
                          size="2x"
                          transform="left-3"
                        />
                        <FontAwesomeIcon
                          icon={faThList}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{data.categoryNodes.length}</strong>
                    </CardTitle>
                    <small className="text-muted">active categories</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faCircle}
                          size="2x"
                          transform="left-3"
                        />
                        <FontAwesomeIcon
                          icon={faBox}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{data.catalog.data.totalResults}</strong>
                    </CardTitle>
                    <small className="text-muted">active items</small>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="my-4">
              <h4 className="mb-1">Recent Orders</h4>
              <Orders />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
