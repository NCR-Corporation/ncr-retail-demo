import { useContext } from 'react';
import Header from '../components/public/Header';
import {
  Jumbotron, Row, Col,
  Spinner
} from 'reactstrap';
import useCatalog from '../context/useCatalog';
import ItemCard from '../components/public/ItemCard';
import { UserStoreContext } from '../context/AppContext';

function Home() {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id);
  return (
    <div>
      <Header />
      <main className="container mt-4">
        <Jumbotron>
          <h1 className="display-4">Latest Items</h1>
        </Jumbotron>
        <Row>
          {isLoading && <Spinner />}
          {isError && <small className="text-muted center">Uhoh, we've hit an error.</small>}
          {!isLoading && !isError && catalogItems.data.pageContent.map((item) => (
            <Col sm="3" md="3" lg="3" className="mb-4" key={item.item.itemId.itemCode}>
              <ItemCard catalogItem={item} showCartButton={false} />
            </Col>

          ))}
        </Row>
      </main>
    </div>
  )
}


export default Home