import { useContext } from 'react';
import { Jumbotron, Row, Col, Spinner } from 'reactstrap';
import Header from '~/components/public/Header';
import useCatalog from '~/lib/hooks/useCatalog';
import ItemCard from '~/components/public/ItemCard';
import { UserStoreContext } from '~/context/userStore';

function Home() {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id);
  return (
    <div>
      <Header />
      <main className="container mt-4">
        {isLoading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}

        {isError && (
          <small className="text-muted center">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && (
          <div>
            <Jumbotron>
              <h1 className="display-4">Latest Items</h1>
            </Jumbotron>
            <Row>
              {catalogItems.data.pageContent.map((item) => (
                <Col
                  xs="6"
                  sm="4"
                  className="mb-4"
                  key={item.item.itemId.itemCode}
                >
                  <ItemCard catalogItem={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
