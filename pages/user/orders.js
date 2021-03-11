import Header from '~/components/public/Header';
import Head from 'next/head';
import Footer from '~/components/public/Footer';
import Sidebar from '~/components/public/user/Sidebar';
import { Card, CardBody, Col, Row } from 'reactstrap';
import OrderList from '~/components/public/order/OrderList';
import useUserOrders from '~/lib/hooks/useUserOrders';
import { getCategoryNodesForMenu } from '~/lib/category';

const Orders = ({ categories }) => {
  const { data, isLoading, isError } = useUserOrders();

  return (
    <div className="d-flex flex-column main-container">
      <Head>
        <title>MART | Orders</title>
      </Head>
      <Header categories={categories} logs={data && data.logs} />
      <main className="container my-4 flex-grow-1">
        <Row>
          <Col md="3">
            <Sidebar url="orders" />
          </Col>
          {isError && (
            <Col sm="9">
              <Card className="shadow-sm">
                <CardBody>
                  <small className="text-muted">
                    Uhoh, we've hit an error.
                  </small>
                </CardBody>
              </Card>
            </Col>
          )}
          {!isError &&
            (!isLoading &&
            data &&
            data.data &&
            data.data.data.pageContent.length == 0 ? (
              <Col sm="9">
                <Card className="shadow-sm">
                  <CardBody>
                    <small className="text-muted">No orders found.</small>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <Col sm="9">
                {!isLoading
                  ? data.data.data.pageContent.map((order) => (
                      <OrderList order={order} key={order.id} />
                    ))
                  : [...Array(4).keys()].map((index) => (
                      <OrderList order={null} key={index} />
                    ))}
              </Col>
            ))}
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      logs,
    },
  };
}

export default Orders;
