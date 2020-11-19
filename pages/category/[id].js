import Header from '../../components/public/Header';
import Link from 'next/link';
import ItemCard from '../../components/public/ItemCard';
import {
  Card, Col, Row, CardBody, CardImg,
  CardSubtitle
} from 'reactstrap';
import useCategory from '../../context/useCategory';
import { useContext } from 'react';
import { UserStoreContext } from '../../context/AppContext';

export default function Category({ id, categories }) {

  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useCategory(id, userStore.id);
  let category, childrenCategories, categoryItems;
  if (!isLoading && !isError) {
    category = data.category;
    childrenCategories = data.childrenCategories;
    if (data.categoryItems.data && data.categoryItems.data.pageContent) {
      categoryItems = data.categoryItems.data.pageContent;
    } else {
      categoryItems = data.categoryItems;
    }
  }
  return (
    <div>
      <Header categories={categories} />
      <div className="container mt-2">
        {isLoading && <div />}
        {isError && <p>Error</p>}
        {!isLoading && !isError && (
          <div>
            <h1>{category && category.data && category.data.title.values[0].value}</h1>
            {childrenCategories.data.pageContent.length > 0 && (
              <Row>
                {childrenCategories.data.pageContent.map((child) => (
                  <Col md="3" key={child.nodeCode}>
                    <Card>
                      <CardBody>
                        <Link href={`/category/${child.nodeCode}`}>
                          <a className="h5 card-title">{child.title.value}</a>
                        </Link>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{child.nodeCode}</CardSubtitle>
                      </CardBody>

                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            <div className="container mt-2">
              <div className="row">
                {Object.keys(categoryItems).length > 0 && Object.keys(categoryItems).map(key => (
                  <div className="col-md-3 mb-4" key={key}>
                    <ItemCard item={categoryItems[key]} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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