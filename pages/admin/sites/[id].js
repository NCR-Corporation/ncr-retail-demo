import { useState } from 'react';
import Header from '../../../components/admin/Header';
import useSiteCatalog from '../../../context/useSiteCatalog';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import SiteCatalogTable from '../../../components/admin/SiteCatalogTable';
// import AddItemDetailsModal from '../layouts/AddItemDetailsModal';


export default function Site({ id, categories }) {

  let { siteData, isLoading, isError } = useSiteCatalog(id);
  if (isError) {
    return (
      <div>
        <Header categories={categories} />
        <div className="container">
          <p>Error</p>
        </div>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div>
        <Header categories={categories} />
        <div className="container">
          <p>Loading</p>
        </div>
      </div>
    )
  }
  const { site, siteCatalog, catalog } = siteData;
  // const [selectedItem, setSelectedItem] = useState(false);
  return (
    <div>
      <Header categories={categories} />

      <div className="container">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>
                  {site.siteName}
                </CardTitle>
                <a href={`/admin/sites/edit?id=${site.id}`}>Edit Site</a>
                <a href={`/admin/sites/addItem?id=${site.id}`}>Add Item</a>
                {/* <AddItemModal catalog={catalog} /> */}
                {/* <AddItemDetailsModal selectedItem={selectedItem} /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <SiteCatalogTable catalog={siteCatalog} setExpandRow={true} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id
    }
  }

}