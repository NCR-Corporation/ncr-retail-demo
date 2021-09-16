import CategoryForm from '~/components/admin/categories/CategoryForm';
import { getAllCategoryNodes } from '~/lib/category';
import Layout from '~/components/admin/Layout';

const EditCategory = ({ categoryId, categoryNodes }) => {
  return (
    <Layout activeTab="categories">
      <CategoryForm categoryId={categoryId} categoryNodes={categoryNodes.categories} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const response = await getAllCategoryNodes();
  const categoryNodes = JSON.parse(JSON.stringify(response));
  console.log('the category', categoryNodes);
  return {
    props: {
      categoryId: context.params.id,
      categoryNodes
    }
  };
}

export default EditCategory;
