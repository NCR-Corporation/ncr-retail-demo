import SiteForm from '~/components/admin/sites/SiteForm';
import Layout from '~/components/admin/Layout';

const EditSite = ({ siteId }) => {
  return (
    <Layout activeTab="sites">
      <SiteForm siteId={siteId} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      siteId: context.params.id
    }
  };
}

export default EditSite;
