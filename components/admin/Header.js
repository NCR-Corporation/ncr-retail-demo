import React from 'react';
import Link from 'next/link';
import { Container, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';

const Header = () => {
  return (
    <header className="section-header bg-white shadow-sm">
      <section className="header-top-light border-bottom">
        <Container>
          <Nav className="d-flex justify-content-end row">
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </section>
      <section className="header-main border-bottom py-2">
        <Container>
          <Row className="align-items-center">
            <Col sm="4" md="3">
              <Link href="/admin/dashboard" className="logo-text">
                <a className="logo-text">MARKET</a>
              </Link>
            </Col>
            <Col className="col text-md-right">
              <Link href="/admin/sites/new">
                <a>
                  <Button color="primary">New Site</Button>
                </a>
              </Link>
              <Link href="/admin/category/new">
                <a>
                  <Button color="primary" className="ml-1">
                    New Category
                  </Button>
                </a>
              </Link>
              <Link href="/admin/catalog/new">
                <a>
                  <Button color="primary" className="ml-1">
                    New Item
                  </Button>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </header>
  );
};

export default Header;
