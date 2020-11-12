import { getCatelogItemsByMerchandiseCategoryId } from "../../lib/catalog"


const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <img className="card-img-top" src="/images/suit-1.jpg" />
      {/* <div className="card-img-top" style={{ padding: '15%' }}>
        <img className="mx-auto d-bloc" src="/images/mens-jeans-1.jpg" />
      </div> */}
      <div className="card-body">
        <h5 className="card-title">{item.name ?? 'Product Name'}</h5>
        <h6 className="card-subtitle mb-2 text-muted">${item['item-price'].price}</h6>
        {/* <p className="card-text">{item.shortDescription.value}</p> */}
        <button className="btn btn-primary float-right">Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemCard;