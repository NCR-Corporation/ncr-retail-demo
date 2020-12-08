import { useContext, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import { UserCartContext } from '~/context/userCart';
import { UserStoreContext } from '~/context/userStore';
import Header from '~/components/public/Header';
import CartCheckout from '~/components/public/cart/CartCheckout';
import CartList from '~/components/public/cart/CartList';

export default function Cart() {
  const { userCart, setUserCart } = useContext(UserCartContext);
  const { userStore } = useContext(UserStoreContext);
  console.log(userCart);

  const [cartCreated, setCartCreated] = useState(true);

  // // if (userCart.totalQuantity > 0 && !userCart.etag && !userCart.location) {
  // // setCartCreated(false);
  // fetch(`/api/cart`, {
  //   method: 'POST',
  //   body: JSON.stringify({ siteId: userStore.id, cart: userCart }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // userCart.location = data.location;
  //     // userCart.etag = data.etag;
  //     // setUserCart(userCart);
  //   });

  // // setCartCreated(true);
  // // }

  return (
    <div>
      <Header />
      <main className="container">
        {!cartCreated ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        ) : (
          <div>
            {userCart && userCart.location && (
              <div>
                {userCart.location.split('/')[2]} // {userCart.etag}
              </div>
            )}
            <Row className="mt-4 mb-2">
              <Col>
                <h4 className="mb-1">My Cart</h4>
              </Col>
            </Row>
            <Row>
              <CartList userCart={userCart} />
              <CartCheckout userCart={userCart} />
            </Row>
          </div>
        )}
      </main>
    </div>
  );
}
