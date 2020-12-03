import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  FormGroup,
  Label,
  Input,
  CardSubtitle,
} from 'reactstrap';
import Header from '~/components/public/Header';
import { UserCartContext } from '~/context/userCart';
import Link from 'next/link';
export default function Cart() {
  const { userCart, setUserCart } = useContext(UserCartContext);
  const cartTotal = userCart.totalPrice;
  console.log(userCart);

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

  const handleQuantityChange = (event, key) => {
    let currentItem = userCart.items[key];
    let totalQuantity = userCart.totalQuantity;
    let totalPrice = userCart.totalPrice;
    totalQuantity =
      totalQuantity - currentItem.quantity + parseInt(event.target.value);
    totalPrice =
      totalPrice -
      currentItem.quantity * currentItem.itemPrices[0].price +
      parseInt(event.target.value) * currentItem.itemPrices[0].price;
    currentItem.quantity = event.target.value;
    userCart.items[key] = currentItem;
    userCart.totalPrice = totalPrice;
    userCart.totalQuantity = totalQuantity;
    console.log(userCart);
    setUserCart(userCart);
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
                      <Row className="d-flex align-items-center">
                        <Col sm="2">
                          <Image
                            alt={
                              userCart.items[key].item.shortDescription.values
                                ? userCart.items[key].item.shortDescription
                                    .values[0].value
                                : userCart.items[key].item.shortDescription
                                    .value
                            }
                            src={
                              userCart.items[key].itemAttributes &&
                              userCart.items[key].itemAttributes.imageUrls &&
                              userCart.items[key].itemAttributes.imageUrls
                                .length > 0
                                ? userCart.items[key].itemAttributes
                                    .imageUrls[0]
                                : 'https://via.placeholder.com/150'
                            }
                            layout="responsive"
                            width={500}
                            height={500}
                            className="p-4"
                          />
                        </Col>
                        <Col sm="10">
                          <Row className="w-100">
                            <Col sm="8" className="mb-2">
                              <Link
                                href={`/catalog/${userCart.items[key].item.itemId.itemCode}`}
                              >
                                <a className="h5 card-title mb-2">
                                  {userCart.items[key].itemAttributes
                                    ? userCart.items[key].itemAttributes
                                        .shortDescription.values[0].value
                                    : userCart.items[key].item.shortDescription
                                        .values[0].value}
                                </a>
                              </Link>
                              <h6 className="text-muted">
                                {userCart.items[key].itemAttributes
                                  ? userCart.items[key].itemAttributes
                                      .longDescription.values[0].value
                                  : userCart.items[key].item.longDescription
                                      .values[0].value}
                                {/* ${userCart.items[key].itemPrices[0].price} */}
                              </h6>
                            </Col>
                            <Col sm="2">
                              <FormGroup>
                                <Input
                                  type="select"
                                  name="select"
                                  id="qtySelect"
                                  value={userCart.items[key].quantity}
                                  onChange={() =>
                                    handleQuantityChange(event, key)
                                  }
                                >
                                  {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                  ).map((item) => (
                                    <option>{item}</option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col sm="2">
                              <Button
                                onClick={() => removeFromCart(key)}
                                color="link"
                                className="float-right mt-1 text-muted p-0"
                              >
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  size="lg"
                                />
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
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
