import Header from '../layouts/Header';
import { getCatalogItemByItemCode } from '../../lib/catalog';

export default function Item({ data, categories }) {
  const item = data.data;

  return (
    <div>
      <Header categories={categories} />
      <div className="container">
        <code>{JSON.stringify(data)}</code>
        {/* <p>{item.itemId.itemCode}</p>
        <p>{item.shortDescription.value}</p> */}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const data = await getCatalogItemByItemCode(context.params.id)
  return {
    props: {
      data,
    }
  }

}