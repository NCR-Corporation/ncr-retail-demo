import React from 'react';
import Header from '~/components/admin/Header';
import NavigationTabs from '~/components/admin/NavigationTabs';
import { Col, Container, Row } from 'reactstrap';

const Layout = (props) => {
  return (
    <div>
      <Header navigation={false} activeTab={props.activeTab} />
      <Container fluid>
        <Row>
          <Col id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-light">
            <div className="sidebar-sticky pt-5">
              <NavigationTabs activeTab={props.activeTab} />
            </div>
          </Col>
          <Col md="9" lg="10" className="ml-sm-auto px-md-4 bg-white">
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
