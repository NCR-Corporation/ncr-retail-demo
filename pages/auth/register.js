import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { Row, Col, Container } from 'reactstrap';
import RegisterForm from '~/components/auth/RegisterForm';

const register = () => {
  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <Container className="my-4 flex-grow-1">
        <Row className="justify-content-md-center my-4">
          <Col md="4">
            <RegisterForm showLoginModal={false} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default register;
