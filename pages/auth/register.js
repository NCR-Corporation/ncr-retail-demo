import { Row, Col, Container } from 'reactstrap';
import RegisterForm from '~/components/auth/RegisterForm';
import Layout from '~/components/public/Layout';

const register = () => {
  return (
    <Layout title="Register">
      <Container className="my-4 flex-grow-1">
        <Row className="justify-content-md-center my-4">
          <Col md="4">
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default register;
