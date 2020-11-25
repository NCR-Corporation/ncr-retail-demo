import Link from 'next/link';
import { mutate } from 'swr';
import Header from '../../../../components/admin/Header';
import useSiteCatalog from '../../../../context/useSiteCatalog';
import { Row, Col } from 'reactstrap';
import SiteCatalogTable from '../../../../components/admin/SiteCatalogTable';

export default function Site({ id, categories }) {
  console.log('the id', id, categories);

  let { siteData, isLoading, isError } = useSiteCatalog(id);

  const fetchUpdatedCatalog = () => {
    console.log('mutate');
    mutate(`/api/sites/${id}/catalog`);
  };

  if (isError) {
    return (
      <div>
        <Header categories={categories} />
        <div className="container">
          <p>Error</p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <Header categories={categories} />
        <div className="container">
          <p>Loading</p>
        </div>
      </div>
    );
  }
  const { site, catalog } = siteData;

  return (
    <div className="bg pb-4">
      <Header />

      <div className="container">
        <Row className="mt-4">
          <Col>
            <h4 className="m-1">{site.siteName}</h4>
          </Col>
          <Col>
            <div className="form-group float-right">
              <Link href={`/admin/sites/${site.id}`}>
                <a className="btn btn-primary">Edit Site</a>
              </Link>
            </div>
          </Col>
        </Row>
        <SiteCatalogTable
          catalog={catalog}
          setExpandRow={true}
          siteId={id}
          fetchUpdatedCatalog={fetchUpdatedCatalog}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}
