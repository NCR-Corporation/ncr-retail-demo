import CatalogForm from '~/components/admin/catalog/CatalogForm';
import { getAllCategoryNodes } from '~/lib/category';

const NewCatalogItem = ({ categoryNodes }) => {
  return <CatalogForm item={null} categories={categoryNodes} />;
};

export async function getServerSideProps() {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryNodes,
    },
  };
}

export default NewCatalogItem;
