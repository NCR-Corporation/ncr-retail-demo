import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Categories({ categories }) {
  const router = useRouter();
  const columns = [{
    dataField: 'nodeId.nodeId',
    text: 'ID',
    sort: true,
    headerStyle: {
      width: '100px'
    }
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
  }, {
    dataField: "",
    text: '',
    headerStyle: {
      width: '80px'
    },
    formatter: (rowContent, row) => {
      return (
        <a href={`/admin/category/${row.nodeId.nodeId}`}><FontAwesomeIcon icon={faEdit} /></a>
      )
    }
  }]

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // router.push(`/admin/category/${row.nodeId.nodeId}`)
    }
  }

  return (
    <div className="mt-4">
      <BootstrapTable bootstrap4 keyField="nodeId.nodeId" data={categories} columns={columns} rowEvents={rowEvents} hover defaultSorted={defaultSorted} />
    </div>
  )
}

export default Categories;