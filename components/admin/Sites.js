import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';

function Sites({ data }) {
  // TODO: Fix if no content
  const router = useRouter();
  const sites = data.data.pageContent;
  const columns = [{
    dataField: "referenceId",
    text: 'Ref ID',
    sort: true
  }, {
    dataField: 'siteName',
    text: "Name",
    sort: true
  }, {
    dataField: 'status',
    text: "Status",
    sort: true
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {

      console.log(e, row, rowIndex);
      router.push(`/admin/sites/edit?id=${row.id}`)
    }
  }
  const rowStyle = { "cursor": "pointer" };
  return (
    <div className="mt-4">
      <BootstrapTable keyField="id" data={sites} columns={columns} rowEvents={rowEvents} hover rowStyle={rowStyle} defaultSorted={defaultSorted} />
    </div>
  )
}



export default Sites;