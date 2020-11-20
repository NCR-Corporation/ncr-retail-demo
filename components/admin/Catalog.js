import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';

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
  }]

  const defaultSorted = [{
    dataField: 'itemId.itemCode',
    order: 'desc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      router.push(`/admin/item/${row.itemId.itemCode}`)
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