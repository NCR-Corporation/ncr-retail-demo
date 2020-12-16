import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import Sidebar from '~/components/public/user/Sidebar';
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import OrderList from '~/components/public/order/OrderList';
import useUserOrders from '~/lib/hooks/useUserOrders';

const Orders = () => {
  const { orders, isLoading, isError } = useUserOrders();

  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Row>
          <Col md="3">
            <Sidebar url="orders" />
          </Col>
          {isLoading && (
            <Col md="9">
              <div className="d-flex justify-content-center">
                <Spinner color="dark" />
              </div>
            </Col>
          )}
          {isError && (
            <Col sm="9">
              <Card className="shadow-sm">
                <CardBody>
                  <small className="text-muted">
                    Uhoh, we've hit an error.
                  </small>
                </CardBody>
              </Card>
            </Col>
          )}
          {!isLoading &&
            !isError &&
            (orders.data.pageContent.length == 0 ? (
              <Col sm="9">
                <Card className="shadow-sm">
                  <CardBody>
                    <small className="text-muted">No orders found.</small>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <Col sm="9">
                {orders.data.pageContent.map((order) => (
                  <OrderList order={order} key={order.id} />
                ))}
              </Col>
            ))}
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
