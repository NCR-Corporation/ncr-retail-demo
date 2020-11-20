import CategoryForm from '../../../components/admin/CategoryForm';
import { getAllCategoryNodes } from '../../../lib/category';
const Edit = ({ id, categoryNodes }) => {
  return (
    <CategoryForm id={id} categoryNodes={categoryNodes} />
  )
}

export async function getServerSideProps(context) {
  const categoryNodes = await getAllCategoryNodes();
  return {
    props: {
      id: context.params.id,
      categoryNodes
    }
  }
}

export default Edit;