import { useContext } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
  CardImgOverlay,
  CardImg,
  CardTitle,
} from 'reactstrap';
import Footer from '~/components/public/Footer';
import Header from '~/components/public/Header';
import useHomepage from '~/lib/hooks/useHomepage';
import ItemCard from '~/components/public/ItemCard';
import { UserStoreContext } from '~/context/userStore';
import Image from 'next/image';

function Home() {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useHomepage(userStore.id);
  console.log(data);
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
                    MART utilizies the Catalog, Sites, Orders, Provisioning, and
                    Security APIs to create a one-stop-shop experience to manage
                    everything for your company.
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
          {isError && (
            <small className="text-muted center">
              Uhoh, we've hit an error.
            </small>
          )}
          {!isLoading && !isError && data && data.homepageContent && (
            <div>
              {Object.keys(data.homepageContent).map((key) => (
                <div>
                  <Card inverse style={{ height: '250px' }}>
                    <Image
                      src={`${data.homepageContent[key].category.tag}`}
                      alt={`${data.homepageContent[key].category.title.value}`}
                      objectFit="none"
                      layout="fill"
                      objectPosition="center"
                      style={{ opacity: '0.75' }}
                    />
                    <CardImgOverlay className="card-img-overlay d-flex align-content-center justify-content-center flex-wrap">
                      <CardTitle tag="h2" className="image-overlay-title">
                        {data.homepageContent[key].category.title.value}
                      </CardTitle>
                    </CardImgOverlay>
                  </Card>
                  <Row>
                    {data.homepageContent[key].catalog.data.pageContent.map(
                      (item) => (
                        <Col
                          xs="4"
                          sm="3"
                          className="mb-4"
                          key={item.item.itemId.itemCode}
                        >
                          <ItemCard catalogItem={item} />
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              ))}
            </div>
          )}
        </div>
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
