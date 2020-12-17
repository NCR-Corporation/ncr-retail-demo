import Link from 'next/link';
import { Button, Col, CardBody, Card, Spinner } from 'reactstrap';
export default function CartCheckout({
  userCart,
  userAPICartLoading,
  userAPICart,
}) {
  const cartTotals = userAPICart.cart.data;
  return (
    <CardBody>
      <h4 className="font-weight-bold mb-4">Overview</h4>
      {userAPICartLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner color="dark" />
        </div>
      ) : cartTotals && userAPICart.cart.status != 200 ? (
        <small className="text-muted">Uhoh, we've hit an error</small>
      ) : (
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
              {Math.round(
                (cartTotals.totals.balanceDue + Number.EPSILON) * 100
              ) / 100}
            </dd>
          </dl>
          <Link href="/checkout">
            <a className="btn btn-primary btn-block">Checkout</a>
          </Link>
        </div>
      )}
    </CardBody>
  );
}
