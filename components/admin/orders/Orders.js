import BootstrapTable from 'react-bootstrap-table-next';

function RecentOrders({ orders }) {
  const columns = [
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
      headerStyle: {
        width: '150px',
      },
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
