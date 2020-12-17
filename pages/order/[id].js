import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
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
import useOrder from '~/lib/hooks/useOrder';

export default function Order({ id }) {
  const { order, isLoading, isError } = useOrder(id);
  const convertStatusText = (text) => {
    if (text === 'OrderPlaced') {
      return 'Order Placed';
    }
    if (text === 'ReceivedForFulfillment') {
      return 'Received for Fulfillment';
    }
    if (text == 'InFulfillment') {
      return 'In Fulfillment';
    }
    if (text == 'Finished') {
      return 'Completed';
    }
  };

  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <Container className="my-4 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center h-100">
            <Spinner color="dark" />
          </div>
        )}
        {isError && <p>Error</p>}
        {!isLoading && !isError && (
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
                <Progress
                  value={`${
                    order.data.status === 'OrderPlaced'
                      ? '1'
                      : order.data.status == 'ReceivedForFulfillment'
                      ? '2'
                      : order.data.status == 'InFulfillment'
                      ? '3'
                      : '4'
                  }`}
                  max="4"
                />
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
        )}
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}
