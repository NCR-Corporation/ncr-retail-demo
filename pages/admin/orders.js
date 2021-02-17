import React from 'react';
import Header from '~/components/admin/Header';
import { Spinner, Container } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import Orders from '~/components/admin/orders/Orders';

const OrdersTab = () => {
  let { data, isLoading, isError } = useDashboard('orders');
  console.log('dat', data);

  return (
    <div>
      <Header navigation={true} activeTab="orders" />
      <Container fluid className="w-75 my-2 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && (
          <Orders
            orders={
              data.orders && data.orders.data && data.orders.data.pageContent
                ? data.orders.data.pageContent
                : []
            }
          />
        )}
      </Container>
    </div>
  );
};

export default OrdersTab;
