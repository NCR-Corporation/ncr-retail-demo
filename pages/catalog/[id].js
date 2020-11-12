import Header from '../layouts/Header';
import { getCatalogItemByItemCode } from '../../lib/catalog';

export default function Item({ item }) {
  console.log(item);

  return (
    <div>
      <Header />
      <div className="container">
        <p>{item.itemId.itemCode}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const item = await getCatalogItemByItemCode(context.params.id)
  return {
    props: {
      item
    }
  }

}