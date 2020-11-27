import CategoryForm from '~/components/admin/categories/CategoryForm';
import { getAllCategoryNodes } from '~/lib/category';

const NewCategory = ({ categoryNodes }) => {
  return <CategoryForm categoryNodes={categoryNodes} />;
};

export async function getServerSideProps() {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryNodes,
    },
  };
}

export default NewCategory;
