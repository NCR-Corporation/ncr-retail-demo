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
  Spinner,
} from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';

const Dashboard = () => {
  let { data, isLoading, isError } = useDashboard();

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
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
          <TabContent activeTab={activeTab}>
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
