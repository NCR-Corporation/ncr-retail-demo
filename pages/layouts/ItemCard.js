import Link from "next/link";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ItemCard = ({ item }) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="https://via.placeholder.com/150" alt="Card image cap" />
        <CardBody>
          <Link href={`/catalog/${item.itemId.itemCode}`}>
            <a className="h5 card-title">{item.shortDescription.value}</a>
          </Link>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{item.price ? `$${item.price.price}` : 'Not available at this store'}</CardSubtitle>
          {/* {item.longDescription.value && <CardText>{item.longDescription.value}</CardText>} */}
        </CardBody>
      </Card>
    </div>
    // <div className="card">
    //   <img className="card-img-top" src="https://via.placeholder.com/150" />
    //   {/* <div className="card-img-top" style={{ padding: '15%' }}>
    //     <img className="mx-auto d-bloc" src="/images/mens-jeans-1.jpg" />
    //   </div> */}
    //   <div className="card-body">
    //     <Link href={`/ catalog / ${item.itemId.itemCode}`}><a className="h5 card-title">{item.shortDescription.value ?? 'Product Name'}</a></Link>
    //     {/* <h6 className="card-subtitle mb-2 text-muted">${item['item-price'].price}</h6> */}
    //     <p className="card-text">$XX.XX</p>
    //     {/* <button className="btn btn-primary float-right">Add to Cart</button> */}
    //   </div>
    // </div>
  );
}

export default ItemCard;