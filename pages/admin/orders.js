import React from 'react';
import Header from '~/components/admin/Header';

import { Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import NavigationTabs from '~/components/admin/NavigationTabs';
import Orders from '~/components/admin/orders/Orders';

const OrdersTab = () => {
  let { data, isLoading, isError } = useDashboard('orders');

  return (
    <div>
      <Header />
      <main className="container my-4 flex-grow-1">
        <NavigationTabs activeTab="orders" />
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Orders orders={data.data.pageContent} />}
      </main>
    </div>
  );
};

export default OrdersTab;
