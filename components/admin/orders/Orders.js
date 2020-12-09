import BootstrapTable from 'react-bootstrap-table-next';

function RecentOrders({ data }) {
  const columns = [
    {
      dataField: 'id',
      text: 'Id',
      sort: true,
      headerStyle: {
        width: '100px',
      },
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
    },
    {
      dataField: 'store',
      text: 'Store',
      sort: true,
    },
    {
      dataField: 'quantity',
      text: 'Quantity',
      sort: true,
    },
    {
      dataField: 'total',
      text: 'Total',
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: 'id',
      order: 'desc',
    },
  ];
  return (
    <div className="text-right my-2">
      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={[]}
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
