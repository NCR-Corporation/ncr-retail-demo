import { Card, CardBody, Col, Row } from 'reactstrap';
import Sidebar from '~/components/public/user/Sidebar';
import OrderList from '~/components/public/order/OrderList';
import useUserOrders from '~/lib/swr/useUserOrders';
import Layout from '~/components/public/Layout';

const Orders = () => {
  const { data, isLoading, isError } = useUserOrders();

  if (isError) {
    return (
      <OrderLayout>
        <Col sm="9">
          <Card className="shadow-sm">
            <CardBody>
              <small className="text-muted">{`Uhoh, we've hit an error.`}</small>
            </CardBody>
          </Card>
        </Col>
      </OrderLayout>
    );
  }

  if (isLoading) {
    return (
      <OrderLayout data={data}>
        <Col sm="9">
          {[...Array(4).keys()].map((index) => (
            <OrderList order={null} key={index} />
          ))}
        </Col>
      </OrderLayout>
    );
  }

  return (
    <OrderLayout data={data}>
      {data && data.data && data.data.data.pageContent.length == 0 ? (
        <Col sm="9">
          <Card className="shadow-sm">
            <CardBody>
              <small className="text-muted">No orders found.</small>
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Col sm="9">
          {data.data.data.pageContent.map((order) => (
            <OrderList order={order} key={order.id} />
          ))}
        </Col>
      )}
    </OrderLayout>
  );
};

const OrderLayout = ({ children, data = null }) => {
  return (
    <Layout logs={data && data.logs} title="Orders">
      <main className="container my-4 flex-grow-1">
        <Row>
          <Col md="3">
            <Sidebar url="orders" />
          </Col>
          {children}
        </Row>
      </main>
    </Layout>
  );
};

export default Orders;
