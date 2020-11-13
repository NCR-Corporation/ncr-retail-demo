import Header from '../layouts/Header';
import { getCatalogItemByItemCode } from '../../lib/catalog';

export default function Category({ data }) {
  const item = data.data;

  return (
    <div>
      <Header />
      <div className="container">
        <code>{JSON.stringify(data)}</code>
        <p>{item.itemId.itemCode}</p>
        <p>{item.shortDescription.value}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const data = await getCatalogItemsByCategory(context.params.id)
  return {
    props: {
      data
    }
  }
}