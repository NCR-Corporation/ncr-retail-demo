import Link from 'next/link';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Catalog({ data }) {
  let isConfigured = true;
  if (
    !process.env.REACT_APP_BSP_ORGANIZATION ||
    !process.env.REACT_APP_BSP_SHARED_KEY ||
    !process.env.REACT_APP_BSP_SECRET_KEY
  ) {
    isConfigured = false;
  }
  const catalog = data.length == 0 ? data : data.data.pageContent;

  const selectOptions = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  };

  const columns = [
    {
      dataField: 'itemId.itemCode',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'shortDescription.value',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (cell) => {
        return selectOptions[cell];
      },
      filter: selectFilter({
        options: selectOptions,
        defaultValue: 'ACTIVE',
      }),
    },
    {
      dataField: '',
      text: '',
      headerStyle: {
        width: '80px',
      },
      formatter: (rowContent, row) => {
        return (
          <>
            <a href={`/admin/catalog/${row.itemId.itemCode}`}>
              <FontAwesomeIcon icon={faEdit} color="darkslategray" />
            </a>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {isConfigured && (
        <div className="text-right mb-2">
          <Link href="/admin/catalog/new">
            <a className="btn btn-primary">New Catalog Item</a>
          </Link>
        </div>
      )}
      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="itemId.itemCode"
          data={catalog}
          columns={columns}
          hover
          noDataIndication="No catalog items found"
          filter={filterFactory()}
        />
      </div>
    </div>
  );
}

export default Catalog;
