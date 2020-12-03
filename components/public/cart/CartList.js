import { useContext } from 'react';
import { Col, Row, Card, CardBody, Button } from 'reactstrap';
import CartItem from './CartItem';
import { UserCartContext } from '~/context/userCart';
export default function CartList({ userCart }) {
  const { setUserCart } = useContext(UserCartContext);
  const emptyCart = () => {
    delete userCart.items;
    userCart.totalQuantity = 0;
    userCart.totalPrice = 0;
    setUserCart(userCart);
  };
  return (
    <Col md="8">
      <div>
        <Card className="mb-2 cart-card">
          <CardBody className="">
            {userCart.totalQuantity > 0 && (
              <Row className="mb-2">
                <Col sm="2"></Col>
                <Col sm="10">
                  <Row className="w-100">
                    <Col sm="8" className="text-muted text-uppercase">
                      <small>Item</small>
                    </Col>
                    <Col sm="2" className="text-muted text-uppercase">
                      <small>Quantity</small>
                    </Col>
                    <Col sm="2"></Col>
                  </Row>
                </Col>
              </Row>
            )}
            {userCart.totalQuantity > 0 ? (
              Object.keys(userCart.items).map((key) => (
                <CartItem
                  item={userCart.items[key]}
                  itemKey={key}
                  userCart={userCart}
                  key={key}
                />
              ))
            ) : (
              <small className="text-muted">No items yet.</small>
            )}
          </CardBody>
        </Card>
        {userCart.totalQuantity > 0 && (
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
