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
  const [userAPICart, setUserAPICart] = useState({});
  const [userAPICartLoading, setUserAPICartLoading] = useState(false);
  console.log(userCart);

  const [cartCreated, setCartCreated] = useState(false);
  if (!userCart.etag || !userCart.location) {
    React.useEffect(async () => {
      setCartCreated(false);
      fetch(`/api/cart`, {
        method: 'POST',
        body: JSON.stringify({ siteId: userStore.id, cart: userCart }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('here');
          console.log('cart data', data);
          userCart.location = data.location;
          userCart.etag = data.etag;
          setUserCart(userCart);
          setCartCreated(true);
        });
    }, [cartCreated]);
  } else {
    React.useEffect(() => {
      setCartCreated(true);
      fetchCart();
    }, [cartCreated]);
  }

  const fetchCart = () => {
    setUserAPICartLoading(true);
    const { location } = userCart;
    fetch(`/api/cart/${userStore.id}/${location}`)
      .then((response) => response.json())
      .then((res) => {
        const { data } = res;
        console.log(data);
        setUserAPICart(data);
        setUserAPICartLoading(false);
      });
  };

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
            <Row>
              <CartList userCart={userCart} />
              <CartCheckout
                userCart={userCart}
                userAPICartLoading={userAPICartLoading}
                userAPICart={userAPICart}
              />
            </Row>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
