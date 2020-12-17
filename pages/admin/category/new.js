import CategoryForm from '~/components/admin/categories/CategoryForm';
import { getAllCategoryNodes } from '~/lib/category';
import Header from '~/components/admin/Header';

const NewCategory = ({ categoryNodes }) => {
  return (
    <div className="bg pb-4">
      <Header />
      <main className="container">
        <CategoryForm categoryNodes={categoryNodes} />;
      </main>
    </div>
  );
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
