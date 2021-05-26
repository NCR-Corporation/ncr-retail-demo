import { mutate } from 'swr';
import { Button, Table } from 'reactstrap';

function RecentOrders({ orders }) {
  const updateOrderStatus = (order, status) => {
    fetch(`/api/order/${order.id}`, {
      method: 'POST',
      body: JSON.stringify({
        siteId: order.enterpriseUnitId,
        orderId: order.id,
        values: {
          status
        }
      })
    })
      .then((res) => res.json())
      .then(() => {
        mutate(`/api/admin/dashboard`);
        mutate(`/api/order/${order.id}`);
      });
  };

  return (
    <div className="text-right my-2">
      <div className="bg-white">
        <Table responsive hover bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Last Updated</th>
              <th>Site</th>
              <th>Status</th>
              <th>Total Items</th>
              <th>Price Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.customer.name}</td>
                <td>{new Date(Date.parse(item.dateUpdated)).toLocaleString()}</td>
                <td>{item.owner}</td>
                <td>{item.status}</td>
                <td>{item.orderLines.length}</td>
                <td>{item.totals[0].value}</td>
                <td>
                  <div>
                    {item.status == 'OrderPlaced' && (
                      <Button size="sm" color="danger" onClick={() => updateOrderStatus(item, 'ReceivedForFulfillment')}>
                        Set Received
                      </Button>
                    )}
                    {item.status == 'ReceivedForFulfillment' && (
                      <Button size="sm" color="warning" onClick={() => updateOrderStatus(item, 'InFulfillment')}>
                        Set In Fulfillment
                      </Button>
                    )}
                    {item.status == 'InFulfillment' && (
                      <Button size="sm" color="info" onClick={() => updateOrderStatus(item, 'Finished')}>
                        Set Finished
                      </Button>
                    )}
                    {item.status == 'Finished' && (
                      <Button disabled color="success" size="sm">
                        Completed
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default RecentOrders;
