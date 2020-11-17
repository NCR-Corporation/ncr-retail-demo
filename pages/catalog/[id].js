import Link from 'next/link';
import { useContext } from 'react';
import Header from '../layouts/Header';
import { Row, Col, Button } from 'reactstrap';
import { UserStoreContext } from '../../context/AppContext';
import useCatalogItem from '../../context/useCatalogItem';

export default function Item({ id, categories }) {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItem, isLoading, isError } = useCatalogItem(id, userStore.id);
  console.log(catalogItem);
  let item;
  if (!isLoading && !isError && catalogItem) {
    item = catalogItem[id];
    console.log(catalogItem);
  }

  return (
    <div className="bg">
      <Header categories={categories} />
      <div className="container pt-4">
        {!isLoading && !isError &&
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {item['categories'].reverse().map((ancestor) => (
                <li className="breadcrumb-item" key={ancestor.nodeCode}><Link href={`/category/${ancestor.nodeCode}`}>{ancestor.title.value}</Link></li>
              ))}
            </ol>
          </nav>
        }
        <div className="card mb-3">
          {isLoading && <p>Loading</p>}
          {isError && <p>Error</p>}
          {!isLoading && !isError &&
            <div className="row no-gutters">
              <div className="col-sm-4">
                <img width="100%" src="https://target.scene7.com/is/image/Target/GUEST_02227710-3cd3-43e8-8f46-af4c7f95bb8f?wid=700&hei=700&qlt=80&fmt=webp" alt="Card image cap" />
              </div>
              <div className="col-sm-6">
                <div className="card-body h-100 d-flex flex-column bd-highlight pb-5">
                  <div className="p-2 bd-highlight">
                    <h2 className="card-title">{item.shortDescription.values[0].value}</h2>
                  </div>
                  <div className="p-2 bd-highlight">
                    <h6 className="card-subtitle mb-2 text-muted"><strong>Item #:</strong> {item.itemId.itemCode}</h6>
                    <p className="card-text">{item.longDescription.values[0].value} // Long description</p>
                  </div>
                  <div className="mt-auto p-2 bd-highlight">
                    <div className="d-flex bd-highlight mb-3">
                      <div className="p-2 bd-highlight">
                        <h3 className="text-muted">{item.price ? `$${item.price.price}` : 'Not available at this store'}</h3>
                      </div>
                      <div className="ml-auto p-2 bd-highlight"><Button color="primary">Add to Cart</Button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div >
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id
    }
  }
}