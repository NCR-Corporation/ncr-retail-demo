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
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryId: context.params.id,
      categoryNodes
    }
  };
}

export default EditCategory;
