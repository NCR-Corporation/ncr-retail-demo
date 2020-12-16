import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { getSession, useSession } from 'next-auth/client';
import useOrder from '~/lib/hooks/useOrder';
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Spinner,
  Progress,
  Row,
} from 'reactstrap';
import CheckoutList from '~/components/public/checkout/CheckoutList';
import { getOrderById } from '~/lib/order';
export default function Order({ order, session }) {
  console.log('the order', order);
  const convertStatusText = (text) => {
    if (text === 'OrderPlaced') {
      return 'Order Placed';
    }
  };
  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <Container className="my-4 flex-grow-1">
        <Card>
          <CardBody className="border-bottom pb-0">
            <CardTitle>
              <strong>Order ID: {order.data.id}</strong>
            </CardTitle>
          </CardBody>
          <CardBody className="row justify-content-md-center">
            <Col sm="12" md="9">
              <h5 className="text-center">
                {convertStatusText(order.data.status)}
              </h5>
              <Progress value="1" max="5" />
            </Col>
          </CardBody>
          <CardBody className="border-bottom">
            <Row className="justify-content-md-center">
              <Col md="3">
                <strong>Shipping</strong>
                <p className="mb-0">{order.data.customer.name}</p>
                <p className="mb-0">{order.data.fulfillment.address.line1}</p>
                <p className="mb-0">
                  {order.data.fulfillment.address.city}{' '}
                  {order.data.fulfillment.address.state}{' '}
                  {order.data.fulfillment.address.postalCode}
                </p>
              </Col>
              <Col md="3">
                <strong>Store</strong>
                <p className="mb-0">{order.data.owner}</p>
                <p className="mb-0">
                  {order.data.channel === 'Web'
                    ? 'Online Order'
                    : order.data.channel}
                </p>
              </Col>
              <Col md="3">
                <strong>Total</strong>
                <p className="mb-0">${order.data.totals[0].value}</p>
              </Col>
            </Row>
          </CardBody>
          <CheckoutList cartItems={order.data.orderLines} showTitle={true} />
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

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
  const order = await getOrderById(context.params.id);
  console.log('the order', order);
  // SUPER basic check on if the current user can view the order
  if (order.data.customer.id != session.user.username) {
    return {
      redirect: {
        destination: '/user/profile',
        permanent: false,
      },
    };
  }
  return {
    props: {
      order,
      session,
    },
  };
}
