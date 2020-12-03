import React, { useState } from 'react';
import Header from '~/components/admin/Header';
import Sites from '~/components/admin/sites/Sites';
import Categories from '~/components/admin/categories/Categories';
import Catalog from '~/components/admin/catalog/Catalog';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Tooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import useDashboard from '~/lib/hooks/useDashboard';

const Dashboard = () => {
  let { data, isLoading, isError } = useDashboard();

  const [exporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [modal, setModal] = useState(false);
  const [downloadJSON, setDownloadJSON] = useState();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
    <div>
      <Header />
      <main className="container mt-4">
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
        <Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target="TooltipExample"
          toggle={toggleTooltip}
        >
          Returns all ACTIVE data in Postman collection.
        </Tooltip>
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

        <Nav tabs>
          <NavItem>
            <NavLink
              active={activeTab === '1' && true}
              onClick={() => {
                toggle('1');
              }}
            >
              Sites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '2' && true}
              onClick={() => {
                toggle('2');
              }}
            >
              Categories
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '3' && true}
              onClick={() => {
                toggle('3');
              }}
            >
              Catalog
            </NavLink>
          </NavItem>
        </Nav>
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && (
          <TabContent activeTab={activeTab} className="bg-white">
            <TabPane tabId="1">
              <Sites data={data.sites} />
            </TabPane>
            <TabPane tabId="2">
              <Categories categories={data.categoryNodes} />
            </TabPane>
            <TabPane tabId="3">
              <Catalog data={data.catalog} />
            </TabPane>
          </TabContent>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
