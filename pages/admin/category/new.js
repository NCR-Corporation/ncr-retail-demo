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
  const response = await getAllCategoryNodes();
  const categoryNodes = JSON.parse(JSON.stringify(response));
  return {
    props: {
      categoryNodes
    }
  };
}

export default NewCategory;
