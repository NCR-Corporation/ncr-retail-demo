import React, { useState } from 'react';
import Header from './layouts/Header';
import Sites from './layouts/Sites';
import Categories from './layouts/Categories';
import Catalog from './layouts/Catalog';
import { getSites } from '../../lib/sites';
import { getCategoryNodes } from '../../lib/category';
import { getCatalogItems } from '../../lib/catalog';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

function Dashboard({ sites, categoryNodes, catalog }) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div>
      <Header />
      <main className="container mt-2">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' && 'active'}
              onClick={() => { toggle('1'); }}
            >
              Sites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' && 'active'}
              onClick={() => { toggle('2'); }}
            >
              Categories
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' && 'active'}
              onClick={() => { toggle('3'); }}
            >
              Catalog
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Sites data={sites} />
          </TabPane>
          <TabPane tabId="2">
            <Categories data={categoryNodes} />
          </TabPane>
          <TabPane tabId="3">
            <Catalog data={catalog} />
          </TabPane>
        </TabContent>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const sites = await getSites();
  const categoryNodes = await getCategoryNodes();
  const catalog = await getCatalogItems();
  return {
    props: {
      sites,
      categoryNodes,
      catalog
    }
  }
}

export default Dashboard