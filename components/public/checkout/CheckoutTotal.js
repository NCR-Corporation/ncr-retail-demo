import { Button, CardBody, Spinner } from 'reactstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CheckoutTotal({ userAPICart, order, user, store }) {
  const router = useRouter();
  const cartTotals = userAPICart.cart.data;
  const [isPurchasing, setIsPurchasing] = useState(false);

  const purchase = async () => {
    setIsPurchasing(true);
    let userOrder = order;
    userOrder['cart'] = userAPICart.cart.data;
    userOrder['lineItems'] = userAPICart.cartItems.data.pageContent;
    userOrder['user'] = user.data;
    userOrder['store'] = store;
    fetch(`/api/order`, { method: 'POST', body: JSON.stringify(userOrder) })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          router.push(`/order/${data.data.id}`);
        }
        setIsPurchasing(false);
      });
  };
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
          {isPurchasing && <Spinner />}
          Purchase
        </Button>
      </div>
    </CardBody>
  );
}
