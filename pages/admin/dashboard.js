import Header from '~/components/admin/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faThList,
  faCheckCircle,
  faCircle,
  faExclamationCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
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
  let ordersPlaced, ordersShipped, ordersFulled;
  if (!isLoading && !isError) {
    let orders = data.orders.data.pageContent;
    ordersPlaced = orders.filter((el) => el.status == 'OrderPlaced');
    ordersShipped = orders.filter((el) => el.status == 'InTransit');
    ordersFulled = orders.filter((el) => el.status == 'Finished');
    console.log(ordersPlaced);
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
                          className="text-danger"
                          icon={faCircle}
                          size="2x"
                          transform="left-3"
                        />
                        <FontAwesomeIcon
                          icon={faExclamationCircle}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersPlaced.length}</strong>
                    </CardTitle>
                    <small className="text-muted">
                      orders waiting to be shipped
                    </small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon
                          className="text-warning"
                          icon={faCircle}
                          size="2x"
                          transform="left-3"
                        />
                        <FontAwesomeIcon
                          icon={faTruck}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersShipped.length}</strong>
                    </CardTitle>
                    <small className="text-muted">orders shipped</small>
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
                          icon={faCheckCircle}
                          inverse
                          transform="shrink-2"
                        />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersFulled.length}</strong>
                    </CardTitle>
                    <small className="text-muted">orders fulfilled</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon
                          className="text-secondary"
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
                      <strong>{data.orders.data.totalResults}</strong>
                    </CardTitle>
                    <small className="text-muted">total orders</small>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="my-4">
              <h4 className="mb-1">Recent Orders</h4>
              <Orders orders={data.orders.data.pageContent} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
