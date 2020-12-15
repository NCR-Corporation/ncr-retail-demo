import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { UserCartContext } from '~/context/userCart';
import { UserStoreContext } from '~/context/userStore';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import CartCheckout from '~/components/public/cart/CartCheckout';
import CartList from '~/components/public/cart/CartList';

export default function Cart() {
  const { userCart, setUserCart } = useContext(UserCartContext);
  const { userStore } = useContext(UserStoreContext);
  const [userAPICart, setUserAPICart] = useState({ cart: {}, cartItems: [] });
  const [userAPICartLoading, setUserAPICartLoading] = useState(false);

  const [cartCreated, setCartCreated] = useState(false);

  React.useEffect(() => {
    setCartCreated(true);
    fetchCart();
  }, [cartCreated]);

  const fetchCart = () => {
    if (userCart.etag && userCart.location) {
      setUserAPICartLoading(true);
      const { location } = userCart;
      fetch(`/api/cart/${userStore.id}/${location}`)
        .then((response) => response.json())
        .then((res) => {
          const { cart, cartItems } = res;
          setUserAPICart({ cart, cartItems });
          setUserAPICartLoading(false);
        });
    } else {
      setUserAPICart({ empty: true });
    }
  };
  console.log(userAPICart);

  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <Container className="my-4 flex-grow-1">
        {!cartCreated ? (
          <div className="d-flex justify-content-center">
            <Spinner color="dark" />
          </div>
        ) : (
          <div>
            <Row className="mb-2">
              <Col>
                <h4 className="mb-1">My Cart</h4>
              </Col>
            </Row>
            {userAPICart.empty === true ? (
              <Row>No cart items.</Row>
            ) : (
              userAPICart.cartItems.data &&
              userAPICart.cartItems.data.pageContent.length > 0 && (
                <Row>
                  <CartList
                    userCart={userAPICart}
                    location={userCart.location}
                    siteId={userStore.id}
                  />
                  <CartCheckout
                    userCart={userCart}
                    userAPICartLoading={userAPICartLoading}
                    userAPICart={userAPICart}
                  />
                </Row>
              )
            )}
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
