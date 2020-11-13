import Header from '../layouts/Header';
import Link from 'next/link';
import { getCategoriesByParentId, getCategoryById } from '../../lib/category';
import { getCatelogItemsByMerchandiseCategoryId } from '../../lib/catalog';
import ItemCard from '../layouts/ItemCard';
import {
  Card, Col, Row, CardBody, CardImg,
  CardSubtitle
} from 'reactstrap';

export default function Category({ category, childrenCategories, items, categories }) {
  console.log('the items', items);

  return (
    <div>
      <Header categories={categories} />
      <div className="container mt-2">
        <h1>{category.data.title.values[0].value}</h1>
        {childrenCategories.data.pageContent.length > 0 && (
          <Row>
            {childrenCategories.data.pageContent.map((child) => (
              <Col md="3" key={child.nodeCode}>
                <Card>
                  <CardImg top width="100%" src="https://via.placeholder.com/150" alt="Card image cap" />
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
            {Object.keys(items).length > 0 && Object.keys(items).map(key => (
              <div className="col-md-3 mb-4" key={key}>
                <ItemCard item={items[key]} />
              </div>
            ))}
            {items.length == 0 && <div className="card">No content</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const category = await getCategoryById(context.params.id);
  const childrenCategories = await getCategoriesByParentId(context.params.id);
  const items = await getCatelogItemsByMerchandiseCategoryId(context.params.id)
  return {
    props: {
      category,
      childrenCategories,
      items,
    }
  }
}