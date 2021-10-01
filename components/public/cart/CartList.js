import { useContext } from 'react';
import { Col, Row, CardBody } from 'reactstrap';
import CartItem from './CartItem';
import { UserCartContext } from '~/context/userCart';
export default function CartList({ userAPICart }) {
  const { userCart } = useContext(UserCartContext);
  const cartItems = userAPICart.cartItems.data.pageContent;
  return (
    <div>
      <CardBody className="">
        {cartItems.length > 0 && (
          <Row className="mb-2">
            <Col sm="10">
              <Row className="w-100">
                <Col sm="8" className="text-muted text-uppercase">
                  <small>Item</small>
                </Col>
                <Col sm="2" className="text-muted text-uppercase">
                  <small>Qty</small>
                </Col>
                <Col sm="2"></Col>
              </Row>
            </Col>
          </Row>
        )}
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem location={userCart.location} item={item} itemKey={item.lineId} key={item.lineId} />)
        ) : (
          <small className="text-muted">No items yet.</small>
        )}
      </CardBody>
    </div>
  );
}
