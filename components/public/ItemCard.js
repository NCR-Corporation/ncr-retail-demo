import Link from "next/link";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ItemCard = ({ item }) => {
  return (
    <div>
      <Card>
        <CardImg className="p-4" top width="100%" src={item && item.attributes && item.attributes.imageUrls && item.attributes.imageUrls.length > 0 ? item.attributes.imageUrls[0] : "https://via.placeholder.com/150"} alt="Card image cap" />
        <CardBody>
          <Link href={`/catalog/${item.itemId.itemCode}`}>
            <a className="h5 card-title">{item.shortDescription.value}</a>
          </Link>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{item.price ? `$${item.price.price}` : 'Not available at this store'}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
}

export default ItemCard;