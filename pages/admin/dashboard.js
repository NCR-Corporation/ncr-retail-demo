import React, { useState } from 'react';
import Header from '../../components/admin/Header';
import Sites from '../../components/admin/Sites';
import Categories from '../../components/admin/Categories';
import Catalog from '../../components/admin/Catalog';
import { getSites } from '../../lib/sites';
import { getAllCategoryNodes } from '../../lib/category';
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
      <main className="container mt-4">
        <Nav tabs>
          <NavItem>
            <NavLink
              active={activeTab === '1' && true}
              onClick={() => { toggle('1'); }}
            >
              Sites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '2' && true}
              onClick={() => { toggle('2'); }}
            >
              Categories
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '3' && true}
              onClick={() => { toggle('3'); }}
            >
              Catalog
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="bg-white">
          <TabPane tabId="1">
            <Sites data={sites} />
          </TabPane>
          <TabPane tabId="2">
            <Categories categories={categoryNodes} />
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
  const sites = await getSites(true);
  const categoryNodes = await getAllCategoryNodes(true);
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