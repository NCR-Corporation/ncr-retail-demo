import Link from 'next/link';
import { Card, CardTitle, CardBody, Col, Row } from 'reactstrap';

export default function OrderList({ order }) {
  const convertStatusText = (text) => {
    if (text === 'OrderPlaced') {
      return 'Order Placed';
    }
  };
  return (
    <Card className="mb-2">
      <CardBody className="border-bottom pb-0">
        <CardTitle>
          <strong>Order ID: {order.id}</strong>
          <p className="float-right">
            Last Updated:{' '}
            {new Date(Date.parse(order.dateUpdated)).toLocaleString()}
          </p>
        </CardTitle>
      </CardBody>
      <CardBody>
        <Row>
          <Col md="3">
            <strong>Shipping To:</strong>
            <p className="mb-0">{order.customer.name}</p>
            {order.fulfillment && (
              <div>
                <p className="mb-0">{order.fulfillment.address.line1}</p>
                <p className="mb-0">
                  {order.fulfillment.address.city}{' '}
                  {order.fulfillment.address.state}{' '}
                  {order.fulfillment.address.postalCode}
                </p>
              </div>
            )}
          </Col>
          <Col md="3">
            <strong>Total:</strong>
            <p className="mb-0">${order.totals[0].value}</p>
          </Col>
          <Col md="3">
            <strong>Status:</strong>
            <p className="mb-0">{convertStatusText(order.status)}</p>
          </Col>
          <Col md="3">
            <Link href={`/order/${order.id}`}>
              <a className="btn btn-outline-primary">View Order</a>
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
