import Link from 'next/link';
import Header from './layouts/Header';
import cookie from 'cookie';
import { getCatelogItemsByMerchandiseCategoryId } from '../lib/catalog';
import ItemCard from './layouts/ItemCard';

export default function Catalog({ data }) {
  // const catalog = items.pageContent;
  const items = data.data.pageContent;
  return (
    <div>
      <Header />
      <div className="container">
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

  // const cookies = cookie.parse(context.req.headers.cookie);
  let defaultStore = '1-003';
  let defaultStoreId = '5b0c5bec0a1b46ab86182cf3e612dd5b';
  const data = await getCatelogItemsByMerchandiseCategoryId(defaultStore, defaultStoreId);
  // console.log('the items', items);


  return {
    props: {
      data,
    }
  }
}