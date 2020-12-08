import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';

function Sites({ data }) {
  const sites = data.data.pageContent;

  const columns = [
    {
      dataField: 'referenceId',
      text: 'Ref ID',
      sort: true,
      headerStyle: {
        width: '100px',
      },
    },
    {
      dataField: 'siteName',
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
      text: 'Edit Site',
      headerStyle: {
        width: '120px',
        textAlign: 'center',
      },
      formatter: (rowContent, row) => {
        return (
          <Row key={row.id}>
            <Col sm="12" className="text-center">
              <Link href={`/admin/sites/${row.id}`}>
                <a>
                  <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
                </a>
              </Link>
            </Col>
          </Row>
        );
      },
    },
    {
      dataField: '',
      text: 'Catalog',
      headerStyle: {
        width: '120px',
        textAlign: 'center',
      },
      formatter: (rowContent, row) => {
        return (
          <Row key={row.id}>
            <Col sm="12" className="text-center">
              <Link href={`/admin/sites/catalog/${row.id}`}>
                <a>
                  <FontAwesomeIcon icon={faBoxes} color="darkslategrey" />
                </a>
              </Link>
            </Col>
          </Row>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'referenceId',
      order: 'desc',
    },
  ];
  return (
    <div className="my-4">
      <BootstrapTable
        bootstrap4
        keyField="referenceId"
        data={sites}
        columns={columns}
        hover
        defaultSorted={defaultSorted}
      />
    </div>
  );
}

export default Sites;
