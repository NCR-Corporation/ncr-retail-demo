import Image from 'next/image';
import { useContext } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  CardSubtitle,
} from 'reactstrap';
import Header from '~/components/public/Header';
import { UserCartContext } from '~/context/userCart';
export default function Cart() {
  const { userCart, setUserCart } = useContext(UserCartContext);
  console.log(userCart);
  const cartTotal = userCart.totalPrice;

  const emptyCart = () => {
    delete userCart.items;
    userCart.totalQuantity = 0;
    userCart.totalPrice = 0;
    setUserCart(userCart);
  };

  const removeFromCart = (key) => {
    let quantity = userCart.items[key].quantity;
    let price = userCart.items[key].itemPrices[0].price; // Not 100% accurate.
    delete userCart.items[key];
    userCart.totalQuantity = userCart.totalQuantity - quantity;
    userCart.totalPrice = userCart.totalPrice - price * quantity;

    setUserCart(userCart);
  };

  const increaseCartQuantity = (key) => {
    let currentItem = userCart.items[key];
    let totalQuantity = userCart.totalQuantity;
    let totalPrice = userCart.totalPrice;
    currentItem.quantity++;
    totalQuantity++;
    totalPrice += currentItem.itemPrices[0].price;
    userCart.items[key] = currentItem;
    userCart.totalPrice = totalPrice;
    userCart.totalQuantity = totalQuantity;
    setUserCart(userCart);
  };

  const decreaseCartQuantity = (key) => {
    let currentItem = userCart.items[key];
    if (currentItem.quantity == 1) {
      // We are removing it then.
      removeFromCart(key);
    } else {
      let totalQuantity = userCart.totalQuantity;
      let totalPrice = userCart.totalPrice;
      currentItem.quantity--;
      totalQuantity--;
      totalPrice -= currentItem.itemPrices[0].price;
      userCart.items[key] = currentItem;
      userCart.totalPrice = totalPrice;
      userCart.totalQuantity = totalQuantity;
      setUserCart(userCart);
    }
  };
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
          <Col md="8">
            <div>
              {userCart.totalQuantity > 0 ? (
                Object.keys(userCart.items).map((key) => (
                  <Card className="mb-2">
                    <Row>
                      <Col sm="3">
                        <Image
                          alt={
                            userCart.items[key].item.shortDescription.values
                              ? userCart.items[key].item.shortDescription
                                  .values[0].value
                              : userCart.items[key].item.shortDescription.value
                          }
                          src={
                            userCart.items[key].itemAttributes &&
                            userCart.items[key].itemAttributes.imageUrls &&
                            userCart.items[key].itemAttributes.imageUrls
                              .length > 0
                              ? userCart.items[key].itemAttributes.imageUrls[0]
                              : 'https://via.placeholder.com/150'
                          }
                          layout="responsive"
                          width={500}
                          height={500}
                          className="p-4"
                        />
                      </Col>
                      <Col sm="9">
                        <CardBody className="h-100 d-flex align-items-center">
                          <Row className="w-100">
                            <Col sm="12" md="8" className="mb-2">
                              <CardTitle tag="h5">
                                {userCart.items[key].itemAttributes
                                  ? userCart.items[key].itemAttributes
                                      .shortDescription.values[0].value
                                  : userCart.items[key].item.shortDescription
                                      .values[0].value}
                              </CardTitle>
                              <CardSubtitle tag="h6" className="text-muted">
                                ${userCart.items[key].itemPrices[0].price}
                              </CardSubtitle>
                            </Col>
                            <Col className="float-right">
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    onClick={() => decreaseCartQuantity(key)}
                                  >
                                    -
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  className="text-center"
                                  value={userCart.items[key].quantity}
                                  disabled
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    onClick={() => increaseCartQuantity(key)}
                                  >
                                    +
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                              <Button
                                onClick={() => removeFromCart(key)}
                                color="link"
                                className="float-right mt-1 text-muted p-0"
                                size="sm"
                              >
                                Remove
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <small className="text-muted">No items yet.</small>
              )}
              {userCart.totalQuantity > 0 && (
                <Row>
                  <Col>
                    <Button
                      onClick={() => emptyCart()}
                      color="link"
                      className="mt-1 text-muted p-0"
                      size="sm"
                    >
                      Empty Cart
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
          <Col md="4">
            {userCart.totalQuantity > 0 && (
              <Card>
                <CardBody>
                  <h4 className="font-weight-bold mb-4">Overview</h4>
                  <dl className="row my-0">
                    <dt className="col-sm-6 text-muted">Subtotal</dt>
                    <dd className="col-sm-6 text-right">
                      $
                      {Math.round(
                        (userCart.totalPrice + Number.EPSILON) * 100
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
                      ${Math.round((cartTotal + Number.EPSILON) * 100) / 100}
                    </dd>
                  </dl>
                  <Button color="primary" block>
                    Purchase
                  </Button>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </main>
    </div>
  );
}
