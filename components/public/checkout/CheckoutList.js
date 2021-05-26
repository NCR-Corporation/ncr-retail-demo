import { CardBody, Col, Row } from 'reactstrap';

export default function CheckoutList({ cartItems, showTitle = false }) {
  return (
    <CardBody>
      {showTitle && <h6>Order Items</h6>}
      <Row className="mb-2">
        <Col sm="12">
          <Row className="w-100">
            <Col sm="6" className="text-muted text-uppercase">
              <small>Item</small>
            </Col>
            <Col sm="2" className="text-muted text-uppercase">
              <small>Qty</small>
            </Col>
            <Col sm="2" className="text-muted text-uppercase">
              <small>Price</small>
            </Col>
            <Col sm="2" className="text-muted text-uppercase">
              <small>Total</small>
            </Col>
          </Row>
        </Col>
      </Row>
      {cartItems.map((item) => (
        <Row key={item.itemId ? item.itemId.value : item.lineId} className="d-flex align-items-center">
          <Col sm="12">
            <Row className="w-100 no-gutters">
              <Col sm="6" className="mb-2">
                <h5 className="card-title mb-2">{item.description}</h5>
              </Col>
              <Col sm="2" className="text-muted text-uppercase">
                <h6 className="text-muted">{item.quantity.value}</h6>
              </Col>
              <Col sm="2" className="text-muted text-uppercase">
                <h6 className="text-muted">${item.price ? item.price.unitPrice : item.unitPrice}</h6>
              </Col>
              <Col sm="2">
                <h6 className="">${item.extendedAmount}</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </CardBody>
  );
}
