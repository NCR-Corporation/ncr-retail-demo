import SiteForm from '~/components/admin/sites/SiteForm';

const EditSite = ({ siteId }) => {
  return <SiteForm siteId={siteId} />;
};

export async function getServerSideProps(context) {
  return {
    props: {
      siteId: context.params.id
    }
  };
}

export default EditSite;
