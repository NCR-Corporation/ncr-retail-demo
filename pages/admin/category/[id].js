import CategoryForm from '~/components/admin/categories/CategoryForm';
import { getAllCategoryNodes } from '~/lib/category';
import Header from '~/components/admin/Header';

const EditCategory = ({ categoryId, categoryNodes }) => {
  console.log('categorynodes', categoryNodes);
  return (
    <div className="bg pb-4">
      <Header />
      <main className="container">
        <CategoryForm
          categoryId={categoryId}
          categoryNodes={categoryNodes.categories}
        />
      </main>
    </div>
  );
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
