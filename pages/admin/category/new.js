import CategoryForm from '~/components/admin/categories/CategoryForm';
import { getAllCategoryNodes } from '~/lib/category';
import Layout from '~/components/admin/Layout';

const NewCategory = ({ categoryNodes }) => {
  return (
    <Layout activeTab="categories">
      <CategoryForm categoryNodes={categoryNodes} />
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

export default NewCategory;
