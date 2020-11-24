import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function Sites({ data }) {
  const router = useRouter();
  const sites = data.data.pageContent;
  const columns = [{
    dataField: "referenceId",
    text: 'Ref ID',
    sort: true,
    headerStyle: {
      width: '100px'
    }
  }, {
    dataField: 'siteName',
    text: "Name",
    sort: true
  }, {
    dataField: 'status',
    text: "Status",
    sort: true
  }, {
    dataField: "",
    text: "",
    headerStyle: {
      width: '80px'
    },
    formatter: (rowContent, row) => {
      return (
        <>
          <a href={`/admin/sites/${row.id}`}><FontAwesomeIcon icon={faEdit} /></a>
        </>
      )
    }
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {

      // console.log(e, row, rowIndex);
      // router.push(`/admin/sites/${row.id}`)
    }
  }
  const rowStyle = { "cursor": "pointer" };
  return (
    <div className="mt-4">
      <BootstrapTable bootstrap4 keyField="id" data={sites} columns={columns} rowEvents={rowEvents} hover rowStyle={rowStyle} defaultSorted={defaultSorted} />
    </div>
  )
}

export default Sites;