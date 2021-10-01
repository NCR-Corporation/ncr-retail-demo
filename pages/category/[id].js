import React from 'react';
import Link from 'next/link';
import { Container, Card, Col, Row, CardBody } from 'reactstrap';
import { useContext } from 'react';
import ItemCard from '~/components/public/ItemCard';
import useCategory from '~/lib/swr/useCategory';
import { UserStoreContext } from '~/context/userStore';
import Skeleton from 'react-loading-skeleton';
import Layout from '~/components/public/Layout';

export default function Category({ id }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useCategory(id, userStore.id);
  let category, childrenCategories, categoryItems;

  if (isLoading) {
    return (
      <CategoryLayout category={category}>
        <Row className="pb-4">
          <Col sm={12}>
            <Skeleton width="33%" />
          </Col>
        </Row>
        <div className="row row-cols-md-3">
          {[...Array(4).keys()].map((index) => (
            <div className="col-sm-6 col-md-3 mb-4" key={index}>
              <ItemCard />
            </div>
          ))}
        </div>
      </CategoryLayout>
    );
  }

  if (isError) {
    return (
      <CategoryLayout category={category}>
        <Row className="pb-4">
          <Col sm={12}>
            <p>{`Uhoh, we've hit an error`}</p>
          </Col>
        </Row>
      </CategoryLayout>
    );
  }

  if (data && data.category) {
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
    <CategoryLayout data={data} category={category}>
      <Row>
        <Col sm={12}>
          <h2 className="text-body font-weight-bolder">{category && category.data.title.values[0].value}</h2>
        </Col>
      </Row>
      {data.category && (
        <div>
          {childrenCategories.data.pageContent.length > 0 && (
            <Row>
              {childrenCategories.data.pageContent.map((child) => (
                <Col sm={smallColumns} md={mediumColumns} key={child.nodeCode}>
                  <Card className="shadow-sm p-2 bg-white rounded border-0 mb-4 category-card">
                    <Link href={`/category/${child.nodeCode}`} passHref>
                      <a>
                        <CardBody>
                          <p className="h5 card-title text-center">{child.title.value}</p>
                        </CardBody>
                      </a>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          <div className="row row-cols-md-3" id="catalog-items">
            {categoryItems.length > 0 ? (
              categoryItems.map((item) => (
                <Col sm={6} md={4} className="mb-4" key={item.item.itemId.itemCode}>
                  <ItemCard catalogItem={item} />
                </Col>
              ))
            ) : (
              <small className="col text-muted">No products yet.</small>
            )}
          </div>
        </div>
      )}
    </CategoryLayout>
  );
}

const CategoryLayout = ({ children, data, category }) => {
  return (
    <Layout logs={data && data.logs ? data.logs : []} title={category ? category.data.title.values[0].value : ''}>
      <Container className="my-4 flex-grow-1">{children}</Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id
    }
  };
}
