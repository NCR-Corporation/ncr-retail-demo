import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxes } from '@fortawesome/free-solid-svg-icons';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Link from 'next/link';
import { Col, Row, Button } from 'reactstrap';

function Sites({ data }) {
  let isConfigured = true;
  if (
    !process.env.REACT_APP_BSP_ORGANIZATION ||
    !process.env.REACT_APP_BSP_SHARED_KEY ||
    !process.env.REACT_APP_BSP_SECRET_KEY
  ) {
    isConfigured = false;
  }
  const sites = data.length == 0 ? data : data.data.pageContent;

  const selectOptions = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  };

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
      formatter: (cell) => {
        return selectOptions[cell];
      },
      filter: selectFilter({
        options: selectOptions,
        defaultValue: 'ACTIVE',
      }),
    },
    {
      dataField: 'site',
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
      dataField: 'catalog',
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
    <div>
      {isConfigured && (
        <div className="text-right my-2">
          <Link href="/admin/sites/new">
            <a className="btn btn-primary">New Site</a>
          </Link>
        </div>
      )}

      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="referenceId"
          data={sites}
          columns={columns}
          hover
          defaultSorted={defaultSorted}
          noDataIndication="No sites found"
          filter={filterFactory()}
        />
      </div>
    </div>
  );
}

export default Sites;
