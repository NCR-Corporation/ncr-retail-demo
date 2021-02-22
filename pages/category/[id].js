import React from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import Link from 'next/link';
import ItemCard from '~/components/public/ItemCard';
import { Container, Card, Col, Row, CardBody, Spinner } from 'reactstrap';
import useCategory from '~/lib/hooks/useCategory';
import { useContext } from 'react';
import { UserStoreContext } from '~/context/userStore';
import { useRouter } from 'next/router';
import { getCategoryNodesForMenu } from '~/lib/category';

export default function Category({ categories }) {
  const router = useRouter();
  const { id } = router.query;
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useCategory(id, userStore.id);
  let category, childrenCategories, categoryItems;
  if (!isLoading && !isError && data && data.category) {
    category = data.category;
    childrenCategories = data.childrenCategories;
    if (data.categoryItems.data && data.categoryItems.data.pageContent) {
      categoryItems = data.categoryItems.data.pageContent;
    } else {
      categoryItems = data.categoryItems;
    }
  }
  let smallColumns = 6;
  let mediumColumns = 6;
  if (childrenCategories && childrenCategories.data.pageContent.length > 0) {
    let length = childrenCategories.data.pageContent.length;
    switch (length) {
      case 2:
        smallColumns = 6;
        break;
      case 3:
        smallColumns = 4;
        mediumColumns = 4;
        break;
      case 4:
        smallColumns = 6;
        mediumColumns = 3;
        break;
      default:
        smallColumns = 6;
        mediumColumns = 4;
        break;
    }
  }
  return (
    <div className="d-flex flex-column main-container">
      <Header
        categories={categories}
        logs={data && data.logs ? data.logs : []}
      />
      <Container className="my-4 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center h-100">
            <Spinner color="dark" />
          </div>
        )}
        {isError && <p>Error</p>}
        {!isLoading && !isError && data && data.category && (
          <div>
            {childrenCategories.data.pageContent.length > 0 && (
              <Row>
                {childrenCategories.data.pageContent.map((child) => (
                  <Col
                    sm={smallColumns}
                    md={mediumColumns}
                    key={child.nodeCode}
                  >
                    <Card className="shadow-sm p-2 bg-white rounded border-0 mb-4 category-card">
                      <Link href={`/category/${child.nodeCode}`} passHref>
                        <a>
                          <CardBody>
                            <p className="h5 card-title text-center">
                              {child.title.value}
                            </p>
                          </CardBody>
                        </a>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            <div className="row row-cols-md-3">
              {categoryItems.length > 0 ? (
                categoryItems.map((item) => (
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

export async function getServerSideProps(context) {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      logs,
    },
  };
}
