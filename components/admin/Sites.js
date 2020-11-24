import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { Col, Row } from 'reactstrap';

function Sites({ data }) {
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
        <Row>
          <Col sm="6">
            <Link href={`/admin/sites/${row.id}`}><a><FontAwesomeIcon icon={faEdit} /></a></Link>
          </Col>
          <Col sm="6">
            <Link href={`/admin/sites/catalog/${row.id}`}><a><FontAwesomeIcon icon={faClipboardList} /></a></Link>
          </Col>
        </Row>
      )
    }
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {

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