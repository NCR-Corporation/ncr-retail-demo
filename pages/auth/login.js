import { Row, Col, Container } from 'reactstrap';
import LoginForm from '~/components/auth/LoginForm';
import { useRouter } from 'next/router';
import Layout from '~/components/public/Layout';

const login = () => {
  const router = useRouter();
  return (
    <Layout title="Login">
      <Container className="my-4 flex-grow-1">
        <Row className="justify-content-md-center my-4">
          <Col md="4">
            <LoginForm query={router.query ?? false} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default login;
