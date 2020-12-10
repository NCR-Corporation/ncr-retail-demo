import { useContext } from 'react';
import { Card, CardBody, Row, Col, Spinner } from 'reactstrap';
import Footer from '~/components/public/Footer';
import Header from '~/components/public/Header';
import useCatalog from '~/lib/hooks/useCatalog';
import ItemCard from '~/components/public/ItemCard';
import { UserStoreContext } from '~/context/userStore';
import WelcomeModal from '~/components/public/WelcomeModal';

function Home({ setup }) {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id);
  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <main className="container my-4 flex-grow-1">
        {/* {setup && <WelcomeModal />} */}
        {isLoading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}

        {isError && (
          <small className="text-muted center">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && (
          <div>
            <Card className="mb-4 border-0 shadow-sm">
              <CardBody>
                <Row className="py-4 text-center">
                  <Col>
                    <h3>
                      Welcome to <strong>MART</strong>
                    </h3>
                    <p>
                      MART is an example application built on top of NCR's APIs.
                      MART utilizies the Catalog, Sites, Orders, Provisioning,
                      and Security APIs to create a one-stop-shop experience to
                      manage everything for your company.
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <h6 className="text-muted">Full Catalog</h6>
            <Row>
              {catalogItems.data.pageContent.map((item) => (
                <Col
                  xs="4"
                  sm="3"
                  className="mb-4"
                  key={item.item.itemId.itemCode}
                >
                  <ItemCard catalogItem={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   let setup = true;
//   if (process.env.REACT_APP_BSP_SECRET_KEY != '') {
//     setup = false;
//   }
//   return {
//     props: {
//       setup,
//     },
//   };
// }

export default Home;
