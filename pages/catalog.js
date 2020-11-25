import { useContext } from 'react';
import Header from '~/components/public/Header';
import { UserStoreContext } from '~/context/AppContext';
import ItemCard from '~/components/public/ItemCard';
import useCatalog from '~/context/useCatalog';

export default function Catalog({ query, categories }) {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id, query);
  return (
    <div>
      <Header categories={categories} />
      <div className="container mt-4">
        <div className="row">
          {isLoading && <div></div>}
          {isError && <div>Error</div>}
          {!isLoading &&
            !isError &&
            catalogItems.data.pageContent.length > 0 &&
            catalogItems.data.pageContent.map((item) => (
              <div className="col-md-4 mb-4" key={item.item.itemId.itemCode}>
                <ItemCard catalogItem={item} />
              </div>
            ))}
        </div>
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
