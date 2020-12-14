import { Button, Col, CardBody, Card, Spinner } from 'reactstrap';
export default function CartCheckout({
  userCart,
  userAPICartLoading,
  userAPICart,
}) {
  console.log('userAPI', userAPICart);
  return (
    <Col md="4">
      {userCart.totalQuantity > 0 && (
        <Card>
          <CardBody>
            <h4 className="font-weight-bold mb-4">Overview</h4>
            {userAPICartLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner color="dark" />
              </div>
            ) : userAPICart.errorType ? (
              <small className="text-muted">Uhoh, we've hit an error</small>
            ) : (
              <div>
                {Object.keys(userAPICart).length == 0 ? (
                  <small className="text-muted">Uhoh, we've hit an error</small>
                ) : (
                  <div>
                    <dl className="row my-0">
                      <dt className="col-sm-6 text-muted">Subtotal</dt>
                      <dd className="col-sm-6 text-right">
                        $
                        {Math.round(
                          (userAPICart.totals.grossAmount + Number.EPSILON) *
                            100
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
                          (userAPICart.totals.balanceDue + Number.EPSILON) * 100
                        ) / 100}
                      </dd>
                    </dl>
                    <Button color="primary" block>
                      Purchase
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </Col>
  );
}
