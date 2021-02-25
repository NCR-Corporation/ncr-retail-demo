import Link from 'next/link';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import { Row, Col, Container, Button } from 'reactstrap';

const Footer = () => {
  const [session, loading] = useSession();
  const startDemo = () => {
    localStorage.clear();
    Router.reload(window.location.pathname);
  };
  return (
    <footer className="footer">
      <Container className="py-5 text-white">
        <Row>
          <Col sm="12" md="4">
            <Link href="/">
              <a className="logo-text">MART</a>
            </Link>
          </Col>
          <Col sm="12" md="4">
            <h6 className="text-uppercase font-weight-bolder text-light">
              Resources
            </h6>
            <ul className="list-unstyled text-small">
              <li>
                <Link href="/sites">
                  <a className="text-white">Find a Store</a>
                </Link>
              </li>
              {!loading && session && (
                <li>
                  <Link href="/user/profile">
                    <a className="text-white">Manage Account</a>
                  </Link>
                </li>
              )}
            </ul>
          </Col>
          <Col sm="12" md="4">
            <h6 className="text-uppercase font-weight-bolder text-light">
              Help
            </h6>
            <ul className="list-unstyled text-small">
              <li>
                <Link href="https://developer.ncrcloud.com/">
                  <a className="text-white">Documentation</a>
                </Link>
              </li>
              <li>
                <Link href="https://github.com/NCR-Corporation/ncr-retail-demo">
                  <a className="text-white">Github</a>
                </Link>
              </li>
              <li>
                <Button
                  color="light"
                  onClick={startDemo}
                  className="text-darker float-right"
                >
                  Start Demo
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
