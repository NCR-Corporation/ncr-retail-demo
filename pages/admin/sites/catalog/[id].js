import Link from 'next/link';
import { mutate } from 'swr';
import Header from '~/components/admin/Header';
import useSiteCatalog from '~/lib/hooks/useSiteCatalog';
import { Row, Col, Spinner } from 'reactstrap';
import SiteCatalogTable from '~/components/admin/sites/SiteCatalogTable';

const SiteCatalog = ({ id, categories }) => {
  let { siteData, isLoading, isError } = useSiteCatalog(id);

  const fetchUpdatedCatalog = () => {
    mutate(`/api/sites/${id}/catalog`);
  };

  return (
    <div className="bg pb-4">
      <Header />

      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner color="dark" />
        </div>
      )}
      {isError && (
        <small className="text-muted">Uhoh, we've hit an error.</small>
      )}
      {!isLoading && !isError && (
        <div className="container">
          <Row className="mt-4">
            <Col>
              <h4 className="m-1">{siteData.site.siteName}</h4>
            </Col>
            <Col>
              <div className="form-group float-right">
                <Link href={`/admin/sites/${siteData.site.id}`}>
                  <a className="btn btn-primary">Edit Site</a>
                </Link>
              </div>
            </Col>
          </Row>
          <SiteCatalogTable
            catalog={siteData.catalog}
            setExpandRow={true}
            siteId={id}
            fetchUpdatedCatalog={fetchUpdatedCatalog}
          />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}

export default SiteCatalog;
