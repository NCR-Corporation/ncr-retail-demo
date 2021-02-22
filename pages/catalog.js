import { useContext } from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { UserStoreContext } from '~/context/userStore';
import ItemCard from '~/components/public/ItemCard';
import useCatalog from '~/lib/hooks/useCatalog';
import { Row, Col, Spinner } from 'reactstrap';
import { getCategoryNodesForMenu } from '~/lib/category';

export default function Catalog({ query, categories }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useCatalog(userStore.id, query);
  let catalogItems;
  return (
    <div className="d-flex flex-column main-container">
      <Header
        categories={categories}
        logs={data && data.logs ? data.logs : []}
      />
      <div className="container my-4 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center h-100">
            <Spinner color="dark" />
          </div>
        )}
        <Row>
          {isError && <p className="text-muted">Uhoh, we've hit an error.</p>}
          {!isLoading &&
            !isError &&
            data.catalogItems.data.pageContent.length > 0 &&
            data.catalogItems.data.pageContent.map((item) => (
              <Col
                sm="6"
                md="3"
                className="mb-4"
                key={item.item.itemId.itemCode}
              >
                <ItemCard catalogItem={item} />
              </Col>
            ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      query: context.query.query ? context.query.query : '',
      categories,
      logs,
    },
  };
}
