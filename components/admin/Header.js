import { useState } from 'react';
import Router from 'next/router';
import React from 'react';
import NavigationTabs from '~/components/admin/NavigationTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Collapse, Container, Nav, Navbar, NavItem, NavbarToggler, NavLink, Row, Col, Button, Popover, PopoverBody, PopoverHeader, Spinner, NavbarBrand, NavbarText } from 'reactstrap';

const Header = () => {
  const [exporting, setIsExporting] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const buildSampleDatabase = () => {
    setIsExporting(true);
    fetch(`/api/export`)
      .then((res) => res.json())
      .then(() => {
        setIsExporting(false);
        Router.reload(window.location.pathname);
      });
  };

  return (
    <>
      <Navbar dark sticky="true" className="flex-md-no-wrap p-0 sticky-top shadow header-top" expand="md">
        <NavbarBrand href="/admin/dashboard" className="col-md-3 col-lg-2 mr-0 px-3 logo-text">
          MART
        </NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isOpen} navbar className="d-flex flex-row-reverse">
          <Nav className="px-3">
            <NavItem>
              <>
                <Button id="Popover1" type="button" color="primary" className="float-right" onClick={() => buildSampleDatabase()}>
                  {exporting ? <Spinner color="light" size="sm" /> : <FontAwesomeIcon icon={faWrench} size="1x" />} Build Sample Database
                </Button>
                <Popover placement="left" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                  <PopoverHeader>Setup Required.</PopoverHeader>
                  <PopoverBody>
                    Application keys are required to build out the datbase. Check out the{' '}
                    <a href="https://github.com/NCR-Corporation/ncr-retail-demo" target="_blank" rel="noreferrer">
                      Github README
                    </a>{' '}
                    for more information.
                  </PopoverBody>
                </Popover>
              </>
            </NavItem>
            <NavItem>
              <NavLink href="/">
                <FontAwesomeIcon icon={faHome} size="1x" /> Home
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {/* <header className="section-header bg-white shadow-sm">
        <section className="header-top border-lighter">
          <Container>
            <Nav className="">
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
                  <Button id="Popover1" type="button" color="primary" className="float-right" onClick={() => buildSampleDatabase()}>
                    {exporting ? <Spinner color="light" size="sm" /> : <FontAwesomeIcon icon={faWrench} size="1x" />} Build Sample Database
                  </Button>
                  <Popover placement="left" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                    <PopoverHeader>Setup Required.</PopoverHeader>
                    <PopoverBody>
                      Application keys are required to build out the datbase. Check out the{' '}
                      <a href="https://github.com/NCR-Corporation/ncr-retail-demo" target="_blank" rel="noreferrer">
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
      </header> */}
    </>
  );
};

export default Header;
