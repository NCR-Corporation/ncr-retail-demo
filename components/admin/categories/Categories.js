import Link from 'next/link';
import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

function Categories({ categories }) {
  const router = useRouter();
  const columns = [
    {
      dataField: 'nodeId.nodeId',
      text: 'ID',
      sort: true,
      headerStyle: {
        width: '100px',
      },
    },
    {
      dataField: 'title.value',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'parentId.nodeId',
      text: 'Parent',
      sort: true,
    },
    {
      dataField: 'tag',
      text: 'Tag',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
    },
    {
      dataField: 'departmentSale',
      text: 'Department Sale',
      sort: true,
    },
    {
      dataField: 'departmentNode',
      text: 'Department Node',
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
          <a href={`/admin/category/${row.nodeId.nodeId}`}>
            <FontAwesomeIcon icon={faEdit} color="darkslategray" />
          </a>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'nodeId.nodeId',
      order: 'asc',
    },
  ];

  return (
    <div className="pb-4">
      <div className="text-right my-2">
        <Link href="/admin/category/new">
          <a className="btn btn-primary">New Category</a>
        </Link>
      </div>
      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="nodeId.nodeId"
          data={categories}
          columns={columns}
          hover
          defaultSorted={defaultSorted}
          noDataIndication="No categories found"
        />
      </div>
    </div>
  );
}

export default Categories;
