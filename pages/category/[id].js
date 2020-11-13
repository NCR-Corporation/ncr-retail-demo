import Header from '../layouts/Header';
import { getCategoryById } from '../../lib/category';
import { getCatelogItemsByMerchandiseCategoryId } from '../../lib/catalog';

export default function Category({ category, data, categories }) {
  const item = data.data;

  return (
    <div>
      <Header categories={categories} />
      <div className="container">
        <h1>{category.data.title.values[0].value}</h1>
        <code>{JSON.stringify(data)}</code>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const category = await getCategoryById(context.params.id);
  const data = await getCatelogItemsByMerchandiseCategoryId(context.params.id)
  return {
    props: {
      category,
      data,
    }
  }
}