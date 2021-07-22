import ItemCard from '~/components/public/ItemCard';
import { Container } from 'reactstrap';
export default function GroupCatalogItems({ isLoading, isError, data }) {
  if (isLoading) {
    return (
      <Container className="my-4 flex-grow-1">
        <div className="row row-cols-md-3">
          {[...Array(4).keys()].map((index) => (
            <div className="col-sm-6 col-md-3 mb-4" key={index}>
              <ItemCard />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="my-4 flex-grow-1">
        <p>{`Uhoh, we've hit an error.`}</p>
      </Container>
    );
  }
  return (
    <Container className="my-4 flex-grow-1">
      <div className="row row-cols-md-3">
        {data.groupItems.data.pageContent.length > 0 ? (
          data.groupItems.data.pageContent.map((item) => (
            <div className="col-sm-6 col-md-3 mb-4" key={item.item.itemId.itemCode}>
              <ItemCard catalogItem={item} />
            </div>
          ))
        ) : (
          <small className="col text-muted">No products yet.</small>
        )}
      </div>
    </Container>
  );
}
