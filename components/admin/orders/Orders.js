import BootstrapTable from 'react-bootstrap-table-next';
import { mutate } from 'swr';
import { Button } from 'reactstrap';

function RecentOrders({ orders }) {
  const updateOrderStatus = (order, status) => {
    fetch(`/api/order/${order.id}`, {
      method: 'POST',
      body: JSON.stringify({
        siteId: order.enterpriseUnitId,
        orderId: order.id,
        values: {
          status,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        mutate(`/api/admin/dashboard`);
        mutate(`/api/order/${order.id}`);
      });
  };
  const columns = [
    {
      dataField: 'id',
      text: 'Id',
      sort: true,
      formatter: (cell, row) => {
        return <small>{cell}</small>;
      },
    },
    {
      dataField: 'customer.name',
      text: 'Customer',
      sort: true,
    },
    {
      dataField: 'dateUpdated',
      text: 'Last Updated',
      sort: true,
      formatter: (cell, row) => {
        let locale = new Date(Date.parse(cell)).toLocaleString();
        return <p>{locale}</p>;
      },
    },
    {
      dataField: 'owner',
      text: 'Site',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
    },
    {
      dataField: 'orderLines',
      text: 'Total Items',
      sort: true,
      formatter: (cell, row) => {
        return <p>{cell.length}</p>;
      },
      headerStyle: {
        width: '150px',
      },
    },
    {
      dataField: 'totals[0].value',
      text: 'Price Total',
      sort: true,
      formatter: (cell, row) => {
        return <p>${cell}</p>;
      },
      headerStyle: {
        width: '150px',
      },
    },
    {
      dataField: '',
      text: '',
      formatter: (rowContent, row) => {
        return (
          <div>
            {row.status == 'OrderPlaced' && (
              <Button
                size="sm"
                color="danger"
                onClick={() => updateOrderStatus(row, 'ReceivedForFulfillment')}
              >
                Set Received
              </Button>
            )}
            {row.status == 'ReceivedForFulfillment' && (
              <Button
                size="sm"
                color="warning"
                onClick={() => updateOrderStatus(row, 'InFulfillment')}
              >
                Set In Fulfillment
              </Button>
            )}
            {row.status == 'InFulfillment' && (
              <Button
                size="sm"
                color="info"
                onClick={() => updateOrderStatus(row, 'Finished')}
              >
                Set Finished
              </Button>
            )}
            {row.status == 'Finished' && (
              <Button disabled color="success" size="sm">
                Completed
              </Button>
            )}
            {/* 
            <Link href={`/admin/orders/${row.id}`}>
              <a className="btn btn-primary">Update</a>
            </Link> */}
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'dateUpdated',
      order: 'desc',
    },
  ];
  return (
    <div className="text-right my-2">
      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={orders}
          columns={columns}
          hover
          defaultSorted={defaultSorted}
          noDataIndication="No recent orders"
        />
      </div>
    </div>
  );
}

export default RecentOrders;
