import CategoryForm from '../../../components/admin/CategoryForm';
import { getAllCategoryNodes } from '../../../lib/category';

const New = ({ categoryNodes }) => {
  return <CategoryForm categoryNodes={categoryNodes} />
}

export async function getServerSideProps() {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      categoryNodes
    }
  }
}


export default New;