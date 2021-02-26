import React, { useContext, useState } from 'react';
import Head from 'next/head';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Spinner,
} from 'reactstrap';
import { UserCartContext } from '~/context/userCart';
import { UserStoreContext } from '~/context/userStore';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import CartCheckout from '~/components/public/cart/CartCheckout';
import CartList from '~/components/public/cart/CartList';

import { getCategoryNodesForMenu } from '~/lib/category';

export default function Cart({ categories, logs }) {
  const { userCart, setUserCart } = useContext(UserCartContext);
  const { userStore } = useContext(UserStoreContext);
  const [userAPICart, setUserAPICart] = useState({ empty: true });
  const [userAPICartLoading, setUserAPICartLoading] = useState(false);

  const [cartCreated, setCartCreated] = useState(false);

  React.useEffect(() => {
    if (!userCart.location && !userCart.etag && userCart.totalQuantity == 0) {
      setUserAPICart({ empty: true });
      setUserAPICartLoading(false);
    } else {
      fetchCart();
    }
  }, [userCart]);

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
          if (cart.status == 404 || cartItems.status == 404) {
          } else {
            setUserAPICart({ cart, cartItems });
          }
          setUserAPICartLoading(false);
        });
    } else {
      setUserAPICart({ empty: true });
      setUserAPICartLoading(false);
    }
  };
  const emptyCart = () => {
    fetch(`/api/cart/${userStore.id}/${userCart.location}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setUserCart({ totalQuantity: 0, etag: null, location: null });
      });
  };

  return (
    <div className="d-flex flex-column main-container">
      <Head>
        <title>MART | Cart</title>
      </Head>
      <Header categories={categories} logs={logs} />
      <Container className="my-4 flex-grow-1">
        <Row className="mb-2">
          <Col>
            <h4 className="mb-1">My Cart</h4>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card className="mb-2 cart-card">
              {userAPICart.empty === true ||
              (userAPICart.cartItems.data &&
                userAPICart.cartItems.data.pageContent &&
                userAPICart.cartItems.data.pageContent.length == 0) ? (
                userAPICartLoading ? (
                  <div className="d-flex justify-content-center py-4">
                    <Spinner color="dark" />
                  </div>
                ) : (
                  <CardBody className="">No cart items.</CardBody>
                )
              ) : (
                userAPICart.cartItems.data &&
                userAPICart.cartItems.data.pageContent &&
                userAPICart.cartItems.data.pageContent.length > 0 && (
                  <CartList
                    userAPICart={userAPICart}
                    location={userCart.location}
                    siteId={userStore.id}
                  />
                )
              )}
            </Card>
            {!userAPICart.empty &&
              userAPICart.cartItems.data &&
              userAPICart.cartItems.data.pageContent &&
              userAPICart.cartItems.data.pageContent.length > 0 && (
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
          </Col>
          <Col md="4">
            {userAPICartLoading ? (
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-center py-4">
                    <Spinner color="dark" />
                  </div>
                </CardBody>
              </Card>
            ) : (
              userAPICart.cartItems &&
              userAPICart.cartItems.data &&
              userAPICart.cartItems.data.pageContent &&
              userAPICart.cartItems.data.pageContent.length > 0 && (
                <Card>
                  <CardBody>
                    <CartCheckout
                      userCart={userCart}
                      userAPICartLoading={userAPICartLoading}
                      userAPICart={userAPICart}
                    />
                  </CardBody>
                </Card>
              )
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      logs,
    },
    revalidate: 60,
  };
}
