import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { Row, Col, Container } from 'reactstrap';
import RegisterForm from '~/components/auth/RegisterForm';
import { getCategoryNodesForMenu } from '~/lib/category';

const register = ({ categories }) => {
  return (
    <div className="d-flex flex-column main-container">
      <Header categories={categories} />
      <Container className="my-4 flex-grow-1">
        <Row className="justify-content-md-center my-4">
          <Col md="4">
            <RegisterForm />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await getCategoryNodesForMenu();
  const { categories, logs } = JSON.parse(JSON.stringify(response));
  return {
    props: {
      categories,
      logs
    }
  };
}

export default register;
