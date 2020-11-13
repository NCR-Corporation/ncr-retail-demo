import { getCategoryNodes } from '../../../lib/category';
import CatalogForm from '../layouts/CatalogForm';

const New = ({ categories }) => {
  return (
    <CatalogForm item={null} categoriesData={categories} />
  )
}

export async function getServerSideProps(context) {
  // const categories = await getCategoryNodes();
  const categories = {};
  return {
    props: {
      categories
    }
  }
}

export default New;