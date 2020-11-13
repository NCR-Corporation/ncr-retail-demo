import { getCategoryNodes } from '../../../lib/category';
import { getCatalogItemByItemCode } from '../../../lib/catalog';
import CatalogForm from '../layouts/CatalogForm';

const Edit = ({ item, categories }) => {
  return (
    <CatalogForm item={item} categoriesData={categories} />
  )
}

export async function getServerSideProps(context) {
  const item = await getCatalogItemByItemCode(context.params.id)
  const categories = await getCategoryNodes();
  return {
    props: {
      item,
      categories
    }
  }
}

export default Edit;