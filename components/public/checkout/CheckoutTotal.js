import { Button, CardBody, Spinner } from 'reactstrap';

export default function CheckoutTotal({ userAPICart, purchase, isPuchasing }) {
  const cartTotals = userAPICart.cart.data;
  return (
    <CardBody>
      <h4 className="font-weight-bold mb-4">Review Cart</h4>
      <div>
        <dl className="row my-0">
          <dt className="col-sm-6 text-muted">Subtotal</dt>
          <dd className="col-sm-6 text-right">
            $
            {Math.round(
              (cartTotals.totals.grossAmount + Number.EPSILON) * 100
            ) / 100}
          </dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-6 text-muted">Taxes</dt>
          <dd className="col-sm-6 text-right">--</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-6">Total</dt>
          <dd className="col-sm-6 text-right border-top">
            $
            {Math.round((cartTotals.totals.balanceDue + Number.EPSILON) * 100) /
              100}
          </dd>
        </dl>
        <Button color="primary" block onClick={purchase}>
          {isPuchasing && <Spinner size="sm" />}
          Purchase
        </Button>
      </div>
    </CardBody>
  );
}
