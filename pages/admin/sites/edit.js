import SiteForm from '../../../components/admin/SiteForm';
const Edit = ({ id }) => {
  console.log('id', id);
  return (
    <SiteForm siteId={id} />
  )
}

export async function getServerSideProps(context) {
  console.log(context.query);
  return {
    props: {
      id: context.query.id
    }
  }
}

export default Edit;