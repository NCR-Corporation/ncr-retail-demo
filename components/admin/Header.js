import { useState } from 'react';
import Router from 'next/router';
import React from 'react';
import Link from 'next/link';
import NavigationTabs from '~/components/admin/NavigationTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Popover,
  PopoverBody,
  PopoverHeader,
  Spinner,
} from 'reactstrap';

const Header = ({ navigation = true, activeTab }) => {
  const [exporting, setIsExporting] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const buildSampleDatabase = () => {
    fetch(`/api/export`)
      .then((res) => res.json())
      .then((data) => {
        Router.reload(window.location.pathname);
      });
  };

  return (
    <header className="section-header bg-white shadow-sm">
      <section className="header-top border-lighter">
        <Container>
          <Nav className="d-flex justify-content-end row">
            <NavItem>
              <NavLink href="/">
                <FontAwesomeIcon icon={faHome} size="1x" /> Home
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </section>
      <section className="header-main border-bottom py-2">
        <Container>
          <Row className="align-items-center">
            <Col sm="4" md="2">
              <Link href="/admin/dashboard" className="logo-text">
                <a className="logo-text">MART</a>
              </Link>
            </Col>
            <Col className="col text-md-right">
              <>
                <Button
                  id="Popover1"
                  type="button"
                  color="primary"
                  className="float-right"
                  onClick={() => buildSampleDatabase()}
                >
                  {exporting ? (
                    <Spinner color="light" size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faWrench} size="1x" />
                  )}{' '}
                  Build Sample Database
                </Button>
                <Popover
                  placement="left"
                  isOpen={popoverOpen}
                  target="Popover1"
                  toggle={toggle}
                >
                  <PopoverHeader>Setup Required.</PopoverHeader>
                  <PopoverBody>
                    Application keys are required to build out the datbase.
                    Check out the{' '}
                    <a
                      href="https://github.com/NCR-Corporation/ncr-retail-demo"
                      target="_blank"
                    >
                      Github README
                    </a>{' '}
                    for more information.
                  </PopoverBody>
                </Popover>
              </>
            </Col>
          </Row>
        </Container>
      </section>
      {navigation && (
        <Container className="">
          <Navbar expand="md" className="p-0" light color="faded">
            <NavigationTabs tabs={false} activeTab={activeTab} />
          </Navbar>
        </Container>
      )}
    </header>
  );
};

export default Header;
