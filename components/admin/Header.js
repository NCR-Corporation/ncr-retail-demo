import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import NavigationTabs from '~/components/admin/NavigationTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDownload } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Modal,
  Tooltip,
  Spinner,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

const Header = ({ navigation = true }) => {
  const [exporting, setIsExporting] = useState(false);
  const [modal, setModal] = useState(false);
  const [downloadJSON, setDownloadJSON] = useState();
  const toggleModal = () => setModal(!modal);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const exportPostman = () => {
    setIsExporting(true);
    fetch(`/api/export`)
      .then((res) => res.json())
      .then((data) => {
        toggleModal();
        setIsExporting(false);
        setDownloadJSON(data);
      });
  };

  return (
    <header className="section-header bg-white shadow-sm">
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Postman Collection</ModalHeader>
        <ModalBody>
          <p>
            Follow the numbering of the requests to make sure the sites,
            categories, and items are all set up correctly.
          </p>
          <a
            href={`data:${downloadJSON}`}
            download="Sample Retail APIs.postman_collection.json"
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faDownload} /> Download Postman Collection
          </a>
        </ModalBody>
      </Modal>
      <section className="header-top-light border-bottom">
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
            {navigation && (
              <Col md="8">
                <NavigationTabs tabs={false} />
              </Col>
            )}
            <Col className="col text-md-right">
              <Tooltip
                placement="right"
                isOpen={tooltipOpen}
                target="TooltipExample"
                toggle={toggleTooltip}
              >
                Returns all ACTIVE data in Postman collection.
              </Tooltip>
              <Button
                color="primary"
                className="float-right"
                id="TooltipExample"
                onClick={() => exportPostman()}
              >
                {exporting ? (
                  <Spinner color="light" size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faDownload} size="1x" />
                )}{' '}
                Export All Data
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </header>
  );
};

export default Header;
