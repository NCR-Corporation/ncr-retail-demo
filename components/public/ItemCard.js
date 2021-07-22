import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Card, Spinner, CardBody, CardFooter, Row, Col, Button } from 'reactstrap';
import { UserCartContext } from '~/context/userCart';
import { UserStoreContext } from '~/context/userStore';
import Skeleton from 'react-loading-skeleton';

const ItemCard = ({ catalogItem = {}, showCartButton = true }) => {
  const { item, itemPrices, itemAttributes } = catalogItem;
  const { userCart, setUserCart } = useContext(UserCartContext);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { userStore } = useContext(UserStoreContext);

  const handleAddToCart = async (itemObj) => {
    itemObj['quantity'] = 1;
    setAddingToCart(true);
    setAddedToCart(false);
    fetch(`/api/cart`, {
      method: 'POST',
      body: JSON.stringify({
        siteId: userStore.id,
        cart: userCart,
        etag: userCart.etag ?? false,
        location: userCart.location ?? false,
        item: itemObj
      })
    })
      .then((response) => response.json())
      .then((data) => {
        userCart.location = data.location;
        userCart.etag = data.etag;
        userCart.totalQuantity = userCart.totalQuantity ? userCart.totalQuantity + 1 : 1;
        setUserCart(userCart);
        setAddingToCart(false);
        setAddedToCart(true);
      });
  };

  return (
    <Card className="border-0 shadow-sm item-card h-100">
      {item ? (
        <Link href={item ? `/catalog/${item.itemId.itemCode}` : '#'}>
          <a aria-label={item.shortDescription.values[0].value}>
            <Image
              alt={item.shortDescription.values ? item.shortDescription.values[0].value : item.shortDescription.value}
              src={
                itemAttributes && itemAttributes.imageUrls && itemAttributes.imageUrls.length > 0 && itemAttributes.imageUrls[0] !== ''
                  ? itemAttributes.imageUrls[0]
                  : 'https://via.placeholder.com/150'
              }
              layout="responsive"
              width={255}
              height={255}
              className="p-4"
            />
          </a>
        </Link>
      ) : (
        <div className="p-4">
          <Skeleton height="255px" />
        </div>
      )}
      {item ? (
        <CardBody className="d-flex pb-1">
          <div className="align-self-end">
            <Link href={item ? `/catalog/${item.itemId.itemCode}` : '#'}>
              <a className="h5 card-title mb-0">{item.shortDescription.values ? item.shortDescription.values[0].value : item.shortDescription.value}</a>
            </Link>
          </div>
        </CardBody>
      ) : (
        <CardBody className="py-0 border-none">
          <Row>
            <Col md="12">
              <Skeleton />
            </Col>
          </Row>
        </CardBody>
      )}
      <CardFooter className={`bg-white font-weight-bold h6 ${!item && 'card-footer-loading'}`}>
        <Row>
          <Col md="12" className="mb-2">
            {itemPrices ? itemPrices.length > 0 ? `$${itemPrices[0].price}` : 'Not available at this store' : <Skeleton />}
          </Col>
          {item && showCartButton && (
            <Col sm="12" md="12">
              <Button
                block
                className={`float-right ${addedToCart && 'fade-btn'}`}
                color={addedToCart ? 'success' : 'primary'}
                outline
                onClick={() => handleAddToCart(item)}
                onAnimationEnd={() => setAddedToCart(false)}
              >
                {addingToCart && <Spinner size="sm" />}
                {addedToCart ? (
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                    {'  '}Added
                  </div>
                ) : (
                  'Add to Cart'
                )}
              </Button>
            </Col>
          )}
        </Row>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
