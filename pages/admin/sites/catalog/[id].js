import { mutate } from 'swr';
import useSiteCatalog from '~/lib/hooks/useSiteCatalog';
import { Spinner } from 'reactstrap';
import SiteCatalogTable from '~/components/admin/sites/SiteCatalogTable';
import Layout from '~/components/admin/Layout';

const SiteCatalog = ({ id }) => {
  let { siteData, isLoading, isError } = useSiteCatalog(id);

  const fetchUpdatedCatalog = () => {
    mutate(`/api/sites/${id}/catalog`);
  };

  return (
    <Layout activeTab="categories">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{!isLoading && !isError && siteData.site.siteName}</h1>
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner color="dark" />
        </div>
      )}
      {isError && <small className="text-muted">{`Uhoh, we've hit an error.`}</small>}
      {!isLoading && !isError && <SiteCatalogTable catalog={siteData.catalog} setExpandRow={true} siteId={id} fetchUpdatedCatalog={fetchUpdatedCatalog} />}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id
    }
  };
}

export default SiteCatalog;
