import CategoryForm from '~/components/admin/categories/CategoryForm';
import { getAllCategoryNodes } from '~/lib/category';

const EditCategory = ({ categoryId, categoryNodes }) => {
  return <CategoryForm categoryId={categoryId} categoryNodes={categoryNodes} />;
};

export async function getServerSideProps(context) {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryId: context.params.id,
      categoryNodes,
    },
  };
}

export default EditCategory;
