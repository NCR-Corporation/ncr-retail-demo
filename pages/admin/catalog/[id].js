import CatalogForm from '~/components/admin/catalog/CatalogForm';
import { getAllCategoryNodes } from '~/lib/category';
import Layout from '~/components/admin/Layout';

const EditCatalogItem = ({ id, categoryNodes }) => {
  return (
    <Layout activeTab="catalog">
      <CatalogForm id={id} categories={categoryNodes.categories} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const response = await getAllCategoryNodes();
  const categoryNodes = JSON.parse(JSON.stringify(response));
  return {
    props: {
      id: context.params.id,
      categoryNodes
    }
  };
}

export default EditCatalogItem;
