import { useContext, useState } from 'react';
import { Card, Spinner, CardBody, Col, Container, Row } from 'reactstrap';
import CheckoutTotal from '~/components/public/checkout/CheckoutTotal';
import HeaderCheckout from '~/components/public/HeaderCheckout';
import { UserCartContext } from '~/context/userCart';
import { UserStoreContext } from '~/context/userStore';
import { getSession } from 'next-auth/client';
import useCart from '~/lib/hooks/useCart';
import CheckoutList from '~/components/public/checkout/CheckoutList';
import CheckoutTender from '~/components/public/checkout/CheckoutTender';
import CheckoutUser from '~/components/public/checkout/CheckoutUser';
import useUser from '~/lib/hooks/useUser';
import LoginModal from '~/components/auth/LoginModal';
import RegisterConsumerModal from '~/components/auth/RegisterConsumerModal';

const Checkout = ({ session }) => {
  const { userCart } = useContext(UserCartContext);
  const { userStore } = useContext(UserStoreContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  const toggleRegisterModal = () => setRegisterModalOpen(!isRegisterModalOpen);
  const userSession = useUser(session);
  const [order, setOrder] = useState({});
  console.log('user sess', userSession);

  const { cart, isLoading, isError } = useCart(userStore.id, userCart.location);

  return (
    <div className="d-flex flex-column main-container">
      <HeaderCheckout />
      {userSession.isError ? (
        <div>
          <LoginModal
            modalProp={isRegisterModalOpen ? false : true}
            toggle={toggleLoginModal}
            toggleRegister={toggleRegisterModal}
            title="Please login to continue"
          />
          <RegisterConsumerModal
            modalProp={isRegisterModalOpen}
            toggle={toggleRegisterModal}
            toggleLogin={toggleLoginModal}
          />
        </div>
      ) : (
        <Container className="my-4 flex-grow-1">
          <Row className="mb-2">
            <Col>
              <h4 className="mb-1">Checkout</h4>
            </Col>
          </Row>
          {isLoading && (
            <div className="d-flex justify-content-center">
              <Spinner color="primary" />
            </div>
          )}
          {!isLoading && isError && (
            <Row>
              <Col md="8">
                <Card className="mb-2 cart-card">
                  <CardBody>
                    <small className="text-muted">
                      Uhoh, we've hit an error.
                    </small>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          {!isLoading && !isError && (
            <Row>
              <Col md="8">
                <Card className="mb-2 cart-card">
                  <CheckoutList cartItems={cart.cartItems.data.pageContent} />
                </Card>
                <CheckoutUser
                  session={session}
                  order={order}
                  setOrder={setOrder}
                />
                <CheckoutTender
                  cartId={userCart.location}
                  order={order}
                  setOrder={setOrder}
                />
              </Col>
              <Col md="4">
                <Card className="mb-2 cart-card">
                  <CheckoutTotal
                    userAPICart={cart}
                    order={order}
                    setOrder={setOrder}
                    user={userSession.user}
                    store={userStore}
                  />
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const session = await getSession(context);
  if (!session) {
    console.log("We've lost the session");
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}

export default Checkout;
