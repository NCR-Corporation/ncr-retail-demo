import React, { useState } from 'react';
import Header from '../../components/admin/Header';
import Sites from '../../components/admin/Sites';
import Categories from '../../components/admin/Categories';
import Catalog from '../../components/admin/Catalog';
import { getSites } from '../../lib/sites';
import { getAllCategoryNodes } from '../../lib/category';
import { getCatalogItems } from '../../lib/catalog';
import { TabContent, TabPane, Nav, NavItem, NavLink, Tooltip, Button } from 'reactstrap';
import PostmanCollection from '../../public/Sample Retail APIs.postman_collection.json';
import _ from 'lodash';

function Dashboard({ sites, categoryNodes, catalog }) {
  const [activeTab, setActiveTab] = useState('1');
  const [downloadJSON, setDownloadJSON] = useState()

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const exportPostman = () => {
    fetch(`/api/export`).then(res => res.json()).then(data => {
      const { items, sites, categories, itemPrices, itemAttributes } = data;
      let itemsObject = {
        "items": items
      };
      let itemAttributesObject = {
        "itemAttributes": itemAttributes
      };
      let itemPricesObject = {
        "itemPrices": itemPrices
      }
      let categoriesObject = {
        "nodes": categories
      };

      PostmanCollection.item.forEach(item => {
        console.log('item', item.name);
        switch (item.name) {
          case "1: Create Sites":
            console.log('here');
            item.request.body.raw = `{ "sites": "${sites}"}`;
            break;
          case "2: Create Categories":
            item.request.body.raw = JSON.stringify(categoriesObject);
            break;
          case "3: Create Items":
            item.request.body.raw = JSON.stringify(itemsObject);
            break;
          case "4: Create Item Prices":
            item.request.body.raw = JSON.stringify(itemPricesObject);
            break;
          case "5: Create Item Attributes":
            item.request.body.raw = JSON.stringify(itemAttributesObject);
            break;
          default:
            break;
        }
      })
      console.log(PostmanCollection)

      // let index = _.findIndex(PostmanCollection.event, { "listen": "prerequest" })
      // PostmanCollection.event[index].script.exec.push(`postman.setEnvironmentVariable('create-sites', '${sites}');`);
      // PostmanCollection.event[index].script.exec.push(`postman.setEnvironmentVariable('create-categories', ${categoriesObject});`);
      // PostmanCollection.event[index].script.exec.push(`postman.setEnvironmentVariable('create-items', ${itemsObject});`);
      // PostmanCollection.event[index].script.exec.push(`postman.setEnvironmentVariable('create-item-prices', ${itemPricesObject});`);
      // PostmanCollection.event[index].script.exec.push(`postman.setEnvironmentVariable('create-item-attributes', ${itemAttributesObject});`);
      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PostmanCollection));
      // window.location.href = '/Sample Retail APIs.postman_collection.json';
      setDownloadJSON(data);
    });
  }

  return (
    <div>
      <Header />
      <main className="container mt-4">
        <Button outline color="primary" className="float-right" id="TooltipExample" onClick={() => exportPostman()}>Export All Data</Button>
        {downloadJSON &&
          <a href={`data:${downloadJSON}`} download="Sample Retail APIs.postman_collection.json">Download</a>
        }
        <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggleTooltip}>
          Returns all ACTIVE data in Postman collection.
      </Tooltip>
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