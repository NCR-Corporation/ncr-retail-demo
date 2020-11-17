import { useContext } from 'react';
import Header from './layouts/Header';
import { UserStoreContext } from '../context/AppContext';
import ItemCard from './layouts/ItemCard';
import useCatalog from '../context/useCatalog';


export default function Catalog({ categories }) {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id);
  console.log(catalogItems);
  return (
    <div>
      <Header categories={categories} />
      <div className="container mt-2">
        <div className="row">
          {isLoading && <div>Loading</div>}
          {isError && <div>Error</div>}
          {!isLoading && !isError && Object.keys(catalogItems).length > 0 && Object.keys(catalogItems).map(key => (
            <div className="col-md-3 mb-4" key={key}>
              <ItemCard item={catalogItems[key]} />
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}
