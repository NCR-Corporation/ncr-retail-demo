import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Link from 'next/link';
import { Col, Row, Button } from 'reactstrap';

function Groups({ data }) {
  const groups = data.data.pageContent;

  const selectOptions = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  };

  const columns = [
    {
      dataField: 'groupId.groupCode',
      text: 'Group Code',
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
      dataField: '',
      headerStyle: {
        width: '120px',
        textAlign: 'center',
      },
      formatter: (rowContent, row) => {
        return (
          <Row key={row.id}>
            <Col sm="12" className="text-center">
              <Link href={`/admin/groups/${row.groupId.groupCode}`}>
                <a>
                  <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
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
      <div className="text-right my-2">
        <Link href="/admin/groups/new">
          <a className="btn btn-primary">New Group</a>
        </Link>
      </div>

      <div className="bg-white">
        <BootstrapTable
          bootstrap4
          keyField="referenceId"
          data={groups}
          columns={columns}
          hover
          defaultSorted={defaultSorted}
          noDataIndication="No groups found"
          filter={filterFactory()}
        />
      </div>
    </div>
  );
}

export default Groups;
