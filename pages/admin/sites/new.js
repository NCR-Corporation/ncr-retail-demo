import SiteForm from '~/components/admin/sites/SiteForm';
import Layout from '~/components/admin/Layout';

const NewSite = () => {
  return (
    <Layout activeTab="sites">
      <SiteForm />
    </Layout>
  );
};

export default NewSite;
