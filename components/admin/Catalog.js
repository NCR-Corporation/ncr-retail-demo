import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function Catalog({ data }) {
  const catalog = data.data.pageContent;
  const router = useRouter();

  const columns = [{
    dataField: "itemId.itemCode",
    text: 'ID',
    sort: true
  }, {
    dataField: "shortDescription.value",
    text: "Name",
    sort: true
  }, {
    dataField: 'status',
    text: 'Status',
    sort: true
  },
  {
    dataField: "",
    text: "Actions",
    headerStyle: {
      width: '80px'
    },
    formatter: (rowContent, row) => {
      return (
        <>
          <a href={`/admin/item/${row.itemId.itemCode}`}><FontAwesomeIcon icon={faEdit} /></a>
        </>
      )
    }
  }
  ]

  const defaultSorted = [{
    dataField: 'status',
    order: 'asc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // router.push(`/admin/item/${row.itemId.itemCode}`)
    }
  }
  const rowStyle = { "cursor": "pointer" };

  return (
    <div className="mt-4">
      <BootstrapTable bootstrap4 keyField="itemId.itemCode" data={catalog} columns={columns} rowEvents={rowEvents} hover rowStyle={rowStyle} defaultSorted={defaultSorted} />
    </div >
  )
}

export default Catalog;