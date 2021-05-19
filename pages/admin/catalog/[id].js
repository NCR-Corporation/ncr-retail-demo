import CatalogForm from '~/components/admin/catalog/CatalogForm';
import { getAllCategoryNodes } from '~/lib/category';

const EditCatalogItem = ({ id, categoryNodes }) => {
  return <CatalogForm id={id} categories={categoryNodes.categories} />;
};

export async function getServerSideProps(context) {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      id: context.params.id,
      categoryNodes
    }
  };
}

export default EditCatalogItem;
