import React from 'react';
import useDashboard from '~/lib/hooks/useDashboard';
import Orders from '~/components/admin/orders/Orders';
import Layout from '~/components/admin/Layout';

const OrdersTab = () => {
  let { data, isLoading, isError } = useDashboard('orders');

  return (
    <Layout activeTab="orders">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Orders</h1>
      </div>
      {isError ? (
        <p>
          <small className="text-muted">{`Uhoh, we've hit an error.`}</small>
        </p>
      ) : (
        <Orders isLoading={isLoading} isError={isError} orders={data && data.orders && data.orders.data && data.orders.data.pageContent ? data.orders.data.pageContent : []} />
      )}
    </Layout>
  );
};

export default OrdersTab;
