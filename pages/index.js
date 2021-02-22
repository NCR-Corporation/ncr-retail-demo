import { useContext } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
  CardImgOverlay,
  CardTitle,
} from 'reactstrap';
import Footer from '~/components/public/Footer';
import Header from '~/components/public/Header';
import useHomepage from '~/lib/hooks/useHomepage';
import ItemCard from '~/components/public/ItemCard';
import { UserStoreContext } from '~/context/userStore';
import Image from 'next/image';

import { getCategoryNodesForMenu } from '~/lib/category';

function Home({ categories, logs }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useHomepage(userStore.id);
  return (
    <div className="d-flex flex-column main-container">
      <Header
        categories={categories}
        logs={data && data.logs ? data.logs : []}
      />
      <main className="container my-4 flex-grow-1">
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
                    MART utilizies the Catalog, Sites, Cart (Emerald), Orders,
                    Provisioning, and Security APIs to create a one-stop-shop
                    experience to manage everything for your company.
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
          {isLoading && (
            <div className="text-center">
              <Spinner />
            </div>
          )}
          {isError && (
            <small className="text-muted center">
              Uhoh, we've hit an error.
              <code>{JSON.stringify(isError.info)}</code>
            </small>
          )}
          {!isLoading && !isError && userStore.id && data && data.home && (
            <div id="index-list">
              {data.home.length > 0 &&
                data.home.map((element) => (
                  <div key={element.group.data.groupId.groupCode}>
                    <Card
                      inverse
                      style={{ height: '250px' }}
                      className="mb-4 shadow-sm"
                    >
                      <Image
                        src={
                          element &&
                          element.group &&
                          element.group.data &&
                          element.group.data.tag
                            ? element.group.data.tag
                            : ''
                        }
                        alt={`${element.group.data.title.values[0].value}`}
                        objectFit="none"
                        layout="fill"
                        objectPosition="center"
                        style={{ opacity: '0.75' }}
                      />
                      <CardImgOverlay className="card-img-overlay d-flex align-content-center justify-content-center flex-wrap">
                        <CardTitle tag="h2" className="image-overlay-title">
                          {element.group.data.title.values[0].value}
                        </CardTitle>
                      </CardImgOverlay>
                    </Card>
                    <Row>
                      {element.catalog.data.pageContent.map((item) => (
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
                ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      logs,
    },
    revalidate: 1800,
  };
}

export default Home;
