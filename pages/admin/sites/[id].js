import SiteForm from '../../../components/admin/SiteForm';
const Edit = ({ id }) => {
  return (
    <SiteForm siteId={id} />
  )
}

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {
      id: context.params.id
    }
  }
}

export default Edit;