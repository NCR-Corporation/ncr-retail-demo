import CatalogForm from '~/components/admin/CatalogForm';
import { getAllCategoryNodes } from '~/lib/category';

const New = ({ categoryNodes }) => {
  return <CatalogForm item={null} categories={categoryNodes} />;
};

export async function getServerSideProps() {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryNodes,
    },
  };
}

export default New;
