import Link from 'next/link';
import Header from './layouts/Header';
import { getCatalogItems } from '../lib/catalog';
import ItemCard from './layouts/ItemCard';

export default function Catalog({ data, categories }) {
  const items = data.data.pageContent;
  return (
    <div>
      <Header categories={categories} />
      <div className="container mt-2">
        <div className="row">
          {items.length > 0 && Object.keys(items).map(key => (
            <div className="col-md-3 mb-4" key={key}>
              <ItemCard item={items[key]} />
            </div>
          ))}
          {items.length == 0 && <div className="card">No content</div>}
        </div>
      </div>
    </div >
  )
}

export async function getServerSideProps(context) {
  let data = await getCatalogItems();

  return {
    props: {
      data,
    }
  }
}