import CatalogForm from '~/components/admin/catalog/CatalogForm';
import { getAllCategoryNodes } from '~/lib/category';
import Layout from '~/components/admin/Layout';

const NewCatalogItem = ({ categoryNodes }) => {
  return (
    <Layout activeTab="catalog">
      <CatalogForm item={null} categories={categoryNodes.categories} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryNodes
    }
  };
}

export default NewCatalogItem;
