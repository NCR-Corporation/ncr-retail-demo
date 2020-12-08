import Link from 'next/link';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function Catalog({ data }) {
  const catalog = data.data.pageContent;

  const columns = [
    {
      dataField: 'itemId.itemCode',
      text: 'ID',
      sort: true,
      headerStyle: {
        width: '100px',
      },
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

  const defaultSorted = [
    {
      dataField: 'status',
      order: 'asc',
    },
  ];
  return (
    <div>
      <div className="text-right my-2">
        <Link href="/admin/catalog/new">
          <a className="btn btn-primary">New Catalog Item</a>
        </Link>
      </div>
      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="itemId.itemCode"
          data={catalog}
          columns={columns}
          hover
          defaultSorted={defaultSorted}
        />
      </div>
    </div>
  );
}

export default Catalog;
