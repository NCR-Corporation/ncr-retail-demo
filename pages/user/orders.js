import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { getSession } from 'next-auth/client';
import Sidebar from '~/components/public/user/Sidebar';
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import OrderList from '~/components/public/order/OrderList';
import { getOrdersByUser } from '~/lib/order';

const Orders = ({ session, orderData }) => {
  const orders = orderData.data.pageContent;
  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Row>
          <Col md="3">
            <Sidebar url="orders" />
          </Col>
          {orders.length == 0 ? (
            <Col sm="9">
              <Card className="shadow-sm">
                <CardBody>
                  <small className="text-muted">No orders found.</small>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <Col sm="9">
              {orders.map((order) => (
                <OrderList order={order} />
              ))}
            </Col>
          )}
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const session = await getSession(context);
  if (!session) {
    console.log("We've lost the session");
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const orders = await getOrdersByUser(session.user.username);

  // If there is a user, return the current session
  return { props: { session, orderData: orders } };
}

export default Orders;
