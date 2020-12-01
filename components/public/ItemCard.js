import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardBody, CardFooter, Row, Col, Button } from 'reactstrap';
import { UserCartContext } from '~/context/userCart';

const ItemCard = ({ catalogItem, showCartButton = true }) => {
  const { item, itemPrices, itemAttributes } = catalogItem;
  const { userCart, setUserCart } = useContext(UserCartContext);

  const handleAddToCart = (item, itemPrices, itemAttributes) => {
    let currentUserCart = userCart;
    let itemId = item.itemId.itemCode;
    if (currentUserCart.totalQuantity) {
      currentUserCart.totalQuantity++;
    } else {
      currentUserCart.totalQuantity = 1;
    }
    if (currentUserCart.totalPrice) {
      currentUserCart.totalPrice =
        currentUserCart.totalPrice + itemPrices[0].price;
    } else {
      currentUserCart.totalPrice = itemPrices[0].price;
    }
    if (!currentUserCart.items) {
      currentUserCart.items = {};
    }
    if (currentUserCart.items[itemId]) {
      currentUserCart.items[itemId].quantity =
        currentUserCart.items[itemId].quantity + 1;
    } else {
      currentUserCart.items[itemId] = {
        quantity: 1,
        item,
        itemPrices,
        itemAttributes,
      };
    }
    // create new cart
    setUserCart(currentUserCart);
  };

  return (
    <Card className="border-0 shadow-sm item-card h-100">
      <Image
        alt={
          item.shortDescription.values
            ? item.shortDescription.values[0].value
            : item.shortDescription.value
        }
        src={
          itemAttributes &&
          itemAttributes.imageUrls &&
          itemAttributes.imageUrls.length > 0
            ? itemAttributes.imageUrls[0]
            : 'https://via.placeholder.com/150'
        }
        layout="responsive"
        width={500}
        height={500}
        className="p-4"
      />
      <CardBody className="d-flex">
        <div className="align-self-end">
          <Link href={`/catalog/${item.itemId.itemCode}`}>
            <a className="h5 card-title mb-2">
              {item.shortDescription.values
                ? item.shortDescription.values[0].value
                : item.shortDescription.value}
            </a>
          </Link>
        </div>
      </CardBody>
      <CardFooter className="bg-white font-weight-bold h6">
        <Row>
          <Col md="6">
            {itemPrices && itemPrices.length > 0
              ? `$${itemPrices[0].price}`
              : 'Not available at this store'}
          </Col>
          {showCartButton && (
            <Col sm="12" md="6">
              <Button
                className="float-right"
                color="primary"
                onClick={() =>
                  handleAddToCart(item, itemPrices, itemAttributes)
                }
              >
                Add to Cart
              </Button>
            </Col>
          )}
        </Row>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
