import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { UserCartContext } from '~/context/userCart';
import Header from '~/components/public/Header';
import CartCheckout from '~/components/public/cart/CartCheckout';
import CartList from '~/components/public/cart/CartList';

export default function Cart() {
  const { userCart } = useContext(UserCartContext);

  return (
    <div>
      <Header />
      <main className="container">
        <Row className="mt-4 mb-2">
          <Col>
            <h4 className="mb-1">My Cart</h4>
          </Col>
        </Row>
        <Row>
          <CartList userCart={userCart} />
          <CartCheckout userCart={userCart} />
        </Row>
      </main>
    </div>
  );
}
