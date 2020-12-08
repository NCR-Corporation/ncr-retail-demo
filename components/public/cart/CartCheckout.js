import { Button, Col, CardBody, Card } from 'reactstrap';
export default function CartCheckout({ userCart }) {
  const cartTotal = userCart.totalPrice;
  return (
    <Col md="4">
      {userCart.totalQuantity > 0 && (
        <Card>
          <CardBody>
            <h4 className="font-weight-bold mb-4">Overview</h4>
            <dl className="row my-0">
              <dt className="col-sm-6 text-muted">Subtotal</dt>
              <dd className="col-sm-6 text-right">
                $
                {Math.round((userCart.totalPrice + Number.EPSILON) * 100) / 100}
              </dd>
            </dl>
            <dl className="row">
              <dt className="col-sm-6 text-muted">Taxes</dt>
              <dd className="col-sm-6 text-right">--</dd>
            </dl>
            <dl className="row">
              <dt className="col-sm-6">Total</dt>
              <dd className="col-sm-6 text-right border-top">
                ${Math.round((cartTotal + Number.EPSILON) * 100) / 100}
              </dd>
            </dl>
            <Button color="primary" block>
              Purchase
            </Button>
          </CardBody>
        </Card>
      )}
    </Col>
  );
}
