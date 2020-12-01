import { useContext } from 'react';
import Header from '~/components/public/Header';
import { UserStoreContext } from '~/context/userStore';
import ItemCard from '~/components/public/ItemCard';
import useCatalog from '~/lib/hooks/useCatalog';
import { Row, Col } from 'reactstrap';

export default function Catalog({ query }) {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id, query);
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <Row>
          {isLoading && <div></div>}
          {isError && <div>Error</div>}
          {!isLoading &&
            !isError &&
            catalogItems.data.pageContent.length > 0 &&
            catalogItems.data.pageContent.map((item) => (
              <Col
                sm="6"
                md="4"
                className="mb-4"
                key={item.item.itemId.itemCode}
              >
                <ItemCard catalogItem={item} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query.query ? context.query.query : '',
    },
  };
}
