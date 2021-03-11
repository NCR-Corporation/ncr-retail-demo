import React from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import Head from 'next/head';
import ItemCard from '~/components/public/ItemCard';
import {
  Container,
  Card,
  CardImgOverlay,
  CardTitle,
  CardImg,
} from 'reactstrap';
import useGroupItems from '~/lib/hooks/useGroupItems';
import { useContext } from 'react';
import { UserStoreContext } from '~/context/userStore';
import { useRouter } from 'next/router';
import { getCategoryNodesForMenu } from '~/lib/category';
import Skeleton from 'react-loading-skeleton';

export default function Group({ categories }) {
  const router = useRouter();
  const { id } = router.query;
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useGroupItems(id, userStore.id);
  return (
    <div className="d-flex flex-column main-container">
      <Header
        categories={categories}
        logs={data && data.logs ? data.logs : []}
      />
      {!isLoading ? (
        <>
          <Head>
            <title>MART | {data.group.data.title.values[0].value}</title>
          </Head>
          <Card className="card-group-header" inverse>
            <CardImg
              src={data.group.data.tag}
              className="w-100"
              style={{
                width: '100%',
                height: '150px',
                opacity: '0.75',
                objectFit: 'cover',
              }}
            />
            <CardImgOverlay className="card-img-overlay d-flex flex-wrap align-items-center">
              <Container>
                <CardTitle tag="h2" className="image-overlay-title">
                  {data.group.data.title.values[0].value}
                </CardTitle>
              </Container>
            </CardImgOverlay>
          </Card>
        </>
      ) : (
        <Card inverse className="card-group-header">
          <CardImgOverlay className="card-img-overlay d-flex flex-wrap align-items-center">
            <Container>
              <CardTitle tag="h2" className="image-overlay-title">
                <Skeleton width="33%" />
              </CardTitle>
            </Container>
          </CardImgOverlay>
        </Card>
      )}

      <Container className="my-4 flex-grow-1">
        {isLoading && (
          <div>
            <div className="row row-cols-md-3">
              {[...Array(4).keys()].map((index) => (
                <div className="col-sm-6 col-md-3 mb-4" key={index}>
                  <ItemCard />
                </div>
              ))}
            </div>
          </div>
        )}
        {isError && <p>Error</p>}
        {!isLoading && !isError && data && data.groupItems && (
          <div>
            <div className="row row-cols-md-3">
              {data.groupItems.data.pageContent.length > 0 ? (
                data.groupItems.data.pageContent.map((item) => (
                  <div
                    className="col-sm-6 col-md-3 mb-4"
                    key={item.item.itemId.itemCode}
                  >
                    <ItemCard catalogItem={item} />
                  </div>
                ))
              ) : (
                <small className="col text-muted">No products yet.</small>
              )}
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      logs,
    },
  };
}
