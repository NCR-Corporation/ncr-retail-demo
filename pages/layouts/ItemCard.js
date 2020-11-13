import Link from "next/link";

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <img className="card-img-top" src="https://via.placeholder.com/150" />
      {/* <div className="card-img-top" style={{ padding: '15%' }}>
        <img className="mx-auto d-bloc" src="/images/mens-jeans-1.jpg" />
      </div> */}
      <div className="card-body">
        <Link href={`/catalog/${item.itemId.itemCode}`}><a className="card-title">{item.shortDescription.value ?? 'Product Name'}</a></Link>
        {/* <h6 className="card-subtitle mb-2 text-muted">${item['item-price'].price}</h6> */}
        <p className="card-text">{item.itemId.itemCode}</p>
        <button className="btn btn-primary float-right">Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemCard;