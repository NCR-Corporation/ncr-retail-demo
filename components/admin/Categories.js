import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';

function Categories({ categories }) {
  const router = useRouter();
  const columns = [{
    dataField: 'nodeId.nodeId',
    text: 'ID',
    sort: true,
  }, {
    dataField: 'title.value',
    text: 'Name',
    sort: true,
  }, {
    dataField: 'parentId.nodeId',
    text: 'Parent',
    sort: true,
  }, {
    dataField: 'status',
    text: 'Status',
    sort: true
  }]

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      router.push(`/admin/category/${row.nodeId.nodeId}`)
    }
  }
  const rowStyle = { "cursor": "pointer" };

  return (
    <div className="mt-4">
      <BootstrapTable bootstrap4 keyField="nodeId.nodeId" data={categories} columns={columns} rowEvents={rowEvents} hover rowStyle={rowStyle} defaultSorted={defaultSorted} />
    </div>
  )
}

export default Categories;