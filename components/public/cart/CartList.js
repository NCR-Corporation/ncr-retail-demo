import { useContext } from 'react';
import { Col, Row, Card, CardBody, Button } from 'reactstrap';
import CartItem from './CartItem';
import { UserCartContext } from '~/context/userCart';
export default function CartList({ userCart, location, siteId }) {
  const emptyCart = () => {
    fetch(`/api/cart/${siteId}/${location}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {});
    // const { userCart, setUserCart } = useContext(UserCartContext);
    // setUserCart({ totalQuantity: 0, etag: null, location: null });
    // console.log(data);
  };
  const cartItems = userCart.cartItems.data.pageContent;
  return (
    <Col md="8">
      <div>
        <Card className="mb-2 cart-card">
          <CardBody className="">
            {cartItems.length > 0 && (
              <Row className="mb-2">
                <Col sm="10">
                  <Row className="w-100">
                    <Col sm="8" className="text-muted text-uppercase">
                      <small>Item</small>
                    </Col>
                    <Col sm="2" className="text-muted text-uppercase">
                      <small>Qty.</small>
                    </Col>
                    <Col sm="2"></Col>
                  </Row>
                </Col>
              </Row>
            )}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  itemKey={item.lineId}
                  userCart={userCart}
                  key={item.lineId}
                />
              ))
            ) : (
              <small className="text-muted">No items yet.</small>
            )}
          </CardBody>
        </Card>
        {cartItems.length > 0 && (
          <Row>
            <Col>
              <Button
                onClick={() => emptyCart()}
                color="link"
                className="mt-1 text-muted p-0"
                size="sm"
              >
                Clear Cart
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </Col>
  );
}
