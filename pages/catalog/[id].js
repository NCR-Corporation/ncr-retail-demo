import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Container,
  Spinner,
  Card,
  Row,
  Col,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { UserStoreContext } from '~/context/userStore';
import { UserCartContext } from '~/context/userCart';
import useCatalogItem from '~/lib/hooks/useCatalogItem';

const CatalogItem = ({ id }) => {
  const { userStore } = useContext(UserStoreContext);
  const { userCart, setUserCart } = useContext(UserCartContext);
  const { catalogItem, isLoading, isError } = useCatalogItem(id, userStore.id);

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
    <div>
      <Header />
      <Container className="pt-4">
        {isLoading && (
          <div className="d-flex justify-content-center">
            <Spinner color="dark" />
          </div>
        )}
        {!isLoading && !isError && (
          <Breadcrumb className="bg-white shadow-sm">
            {catalogItem['categories'].map((ancestor) => (
              <BreadcrumbItem key={ancestor.nodeCode}>
                <Link href={`/category/${ancestor.nodeCode}`}>
                  {ancestor.title.value}
                </Link>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        )}
        {isError && <p>Error</p>}
        {!isLoading && !isError && (
          <Card className="mb-3 border-0 shadow-sm">
            <Row className="no-gutters">
              <Col sm="4">
                <Image
                  src={
                    catalogItem.itemAttributes &&
                    catalogItem.itemAttributes.imageUrls.length > 0
                      ? catalogItem.itemAttributes.imageUrls[0]
                      : 'https://via.placeholder.com/500'
                  }
                  layout="responsive"
                  width={500}
                  height={500}
                  alt={catalogItem.item.shortDescription.values[0].value}
                  className="p-4"
                />
              </Col>
              <Col sm="6">
                <CardBody className="h-100 d-flex flex-column bd-highlight pb-5">
                  <CardTitle tag="h2" className="bd-highlight">
                    {catalogItem.item.shortDescription.values[0].value}
                  </CardTitle>
                  <CardSubtitle className="bd-highlight mb-2 text-muted">
                    <strong>Item #:</strong> {catalogItem.item.itemId.itemCode}
                  </CardSubtitle>
                  <CardText>
                    {catalogItem.item.longDescription.values[0].value}
                  </CardText>
                  <div className="mt-auto p-2 bd-highlight">
                    <div className="d-flex bd-highlight mb-3">
                      <div className="ml-auto p-2 bd-highlight">
                        <h3 className="text-muted">
                          {catalogItem.itemPrices
                            ? `$${catalogItem.itemPrices[0].price}`
                            : 'Not available at this store'}
                        </h3>
                      </div>
                      <div className="ml-auto p-2 bd-highlight">
                        <Button
                          color="primary"
                          onClick={() =>
                            handleAddToCart(
                              catalogItem.item,
                              catalogItem.itemPrices,
                              catalogItem.itemAttributes
                            )
                          }
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Col>
            </Row>
          </Card>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}

export default CatalogItem;
