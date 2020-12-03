import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Col, Row, Button, FormGroup, Input } from 'reactstrap';
import { UserCartContext } from '~/context/userCart';

export default function CartItem({ userCart, item, itemKey }) {
  const { setUserCart } = useContext(UserCartContext);

  const removeFromCart = (itemKey) => {
    let quantity = userCart.items[itemKey].quantity;
    let price = userCart.items[itemKey].itemPrices[0].price; // Not 100% accurate.
    delete userCart.items[itemKey];
    userCart.totalQuantity = userCart.totalQuantity - quantity;
    userCart.totalPrice = userCart.totalPrice - price * quantity;

    setUserCart(userCart);
  };

  const handleQuantityChange = (event, itemKey) => {
    let currentItem = userCart.items[itemKey];
    console.log(currentItem, item, itemKey);
    let totalQuantity = userCart.totalQuantity;
    let totalPrice = userCart.totalPrice;
    totalQuantity =
      totalQuantity - currentItem.quantity + parseInt(event.target.value);
    totalPrice =
      totalPrice -
      currentItem.quantity * currentItem.itemPrices[0].price +
      parseInt(event.target.value) * currentItem.itemPrices[0].price;
    currentItem.quantity = event.target.value;
    userCart.items[itemKey] = currentItem;
    userCart.totalPrice = totalPrice;
    userCart.totalQuantity = totalQuantity;
    console.log(userCart);
    setUserCart(userCart);
  };
  return (
    <Row className="d-flex align-items-center">
      <Col sm="2">
        <Image
          alt={
            item.item.shortDescription.values
              ? item.item.shortDescription.values[0].value
              : item.item.shortDescription.value
          }
          src={
            item.itemAttributes &&
            item.itemAttributes.imageUrls &&
            item.itemAttributes.imageUrls.length > 0
              ? item.itemAttributes.imageUrls[0]
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
            <Link href={`/catalog/${item.item.itemId.itemCode}`}>
              <a className="h5 card-title mb-2">
                {item.itemAttributes
                  ? item.itemAttributes.shortDescription.values[0].value
                  : item.item.shortDescription.values[0].value}
              </a>
            </Link>
            <h6 className="text-muted">
              {item.itemAttributes
                ? item.itemAttributes.longDescription.values[0].value
                : item.item.longDescription.values[0].value}
              {/* ${item.itemPrices[0].price} */}
            </h6>
          </Col>
          <Col sm="2">
            <FormGroup>
              <Input
                type="select"
                name="select"
                id="qtySelect"
                value={item.quantity}
                onChange={() => handleQuantityChange(event, itemKey)}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
                  <option>{item}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col sm="2">
            <Button
              onClick={() => removeFromCart(itemKey)}
              color="link"
              className="float-right mt-1 text-muted p-0"
            >
              <FontAwesomeIcon icon={faTimesCircle} size="lg" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
