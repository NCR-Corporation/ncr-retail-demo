import Header from '~/components/admin/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheckCircle, faCircle, faExclamationCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Container, CardTitle, Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import Orders from '~/components/admin/orders/Orders';

const Dashboard = () => {
  let { data, isLoading, isError } = useDashboard();
  let ordersPlaced = [];
  let ordersReceived = [];
  let ordersInFulfillment = [];
  let ordersFilled = [];
  if (!isLoading && !isError && data && data.orders && data.orders.data.pageContent) {
    let orders = data.orders.data.pageContent;
    ordersPlaced = orders.filter((el) => el.status == 'OrderPlaced');
    ordersReceived = orders.filter((el) => el.status == 'ReceivedForFulfillment');
    ordersInFulfillment = orders.filter((el) => el.status == 'InFulfillment');
    ordersFilled = orders.filter((el) => el.status == 'Finished');
  }
  return (
    <div>
      <Header navigation={true} activeTab="dashboard" />
      <Container fluid className="w-75 py-4 flex-grow-1">
        {/* <NavigationTabs tabs={false} activeTab="dashboard" /> */}
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && <small className="text-muted">{`Uhoh, we've hit an error.`}</small>}
        {!isLoading && !isError && (
          <div className="my-4">
            <Row className="text-center">
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon className="text-danger" icon={faCircle} size="2x" transform="left-3" />
                        <FontAwesomeIcon icon={faExclamationCircle} inverse transform="shrink-2" />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersPlaced.length}</strong>
                    </CardTitle>
                    <small className="text-muted">new orders</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon className="text-warning" icon={faCircle} size="2x" transform="left-3" />
                        <FontAwesomeIcon icon={faShoppingCart} inverse transform="shrink-2" />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersReceived.length}</strong>
                    </CardTitle>
                    <small className="text-muted">orders received</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon className="text-info" icon={faCircle} size="2x" transform="left-3" />
                        <FontAwesomeIcon icon={faTruck} inverse transform="shrink-2" />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersInFulfillment.length}</strong>
                    </CardTitle>
                    <small className="text-muted">orders in fulfillment</small>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">
                      <span className="fa-layers fa-fw pb-2">
                        <FontAwesomeIcon className="text-success" icon={faCircle} size="2x" transform="left-3" />
                        <FontAwesomeIcon icon={faCheckCircle} inverse transform="shrink-2" />
                      </span>
                    </CardTitle>
                    <CardTitle tag="h4" className="m-0">
                      <strong>{ordersFilled.length}</strong>
                    </CardTitle>
                    <small className="text-muted">orders fulfilled</small>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="my-4">
              <h4 className="mb-1">Recent Orders</h4>
              <Orders orders={data.orders && data.orders.data.pageContent ? data.orders.data.pageContent : []} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
