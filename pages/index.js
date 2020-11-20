import Link from 'next/link';
import Header from '../components/public/Header';
import {
  Jumbotron, Button, Row, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

function Home({ data, categories }) {
  return (
    <div>
      <Header site={data} categories={categories} />
      <main className="container mt-4">
        <Jumbotron>
          <h1 className="display-3">Latest Deals</h1>
        </Jumbotron>
        <Row>
          {Array(3).fill(0).map((key, value) => (
            <Col sm="4" key={value}>
              <Card>
                <CardImg top width="100%" src="https://via.placeholder.com/250" alt="Card image cap" />
                <CardBody>
                  <Link href='#'>
                    <a className="h5 card-title">Lorem Ipsum</a>
                  </Link>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">$10.99</CardSubtitle>
                </CardBody>
              </Card>
            </Col>

          ))}
        </Row>
      </main>
    </div>
  )
}


export default Home