import { Row, Col } from 'reactstrap';
import LoginForm from '~/components/auth/LoginForm';

const login = () => {
  return (
    <Row className="justify-content-md-center my-4">
      <Col md="4">
        <LoginForm />
      </Col>
    </Row>
  );
};

export default login;
