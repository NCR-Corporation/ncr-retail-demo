import Link from "next/link";
import {
  Card, CardImg, CardBody,
  CardFooter, Row, Col, Button
} from 'reactstrap';

const ItemCard = ({ catalogItem }) => {
  const { item, itemPrices, itemAttributes } = catalogItem;
  return (
    <Card className="border-0 shadow-sm item-card h-100">
      <CardImg className="p-4" top width="100%" src={itemAttributes && itemAttributes.imageUrls && itemAttributes.imageUrls.length > 0 ? itemAttributes.imageUrls[0] : "https://via.placeholder.com/150"} alt="Card image cap" />
      <CardBody>
        <Link href={`/catalog/${item.itemId.itemCode}`}>
          <a className="h5 card-title mb-2">{item.shortDescription.values ? item.shortDescription.values[0].value : item.shortDescription.value}</a>
        </Link>
      </CardBody>
      <CardFooter className="bg-white font-weight-bold h6">
        <Row>
          <Col md="6">
            {itemPrices && itemPrices.length > 0 ? `$${itemPrices[0].price}` : 'Not available at this store'}
          </Col>
          <Col md="6">
            <Button className="float-right" color="primary">Add to Cart</Button>
          </Col>
        </Row></CardFooter>
    </Card>
  );
}

export default ItemCard;