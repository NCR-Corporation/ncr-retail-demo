import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingTable from '~/components/admin/LoadingTable';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';

function Groups({ data, isError, isLoading }) {
  const groups = data.data && data.data.pageContent.length > 0 ? data.data.pageContent : [];

  return (
    <div>
      <div className="bg-white pb-2">
        <Table responsive hover striped={!isError && !isLoading} size="sm">
          <thead>
            <tr>
              <th>Group Code</th>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {!isError && !isLoading ? (
            <tbody>
              {groups.map((item) => (
                <tr key={item.groupId.groupCode}>
                  <th scope="row">{item.groupId.groupCode}</th>
                  <td>{item.title.value}</td>
                  <td>{item.status}</td>
                  <td>
                    <a href={`/admin/groups/${item.groupId.groupCode}`}>
                      <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            !isError && <LoadingTable />
          )}
        </Table>
        {groups.length == 0 && !isLoading && !isError && <p className="text-center">No groups found.</p>}
      </div>
    </div>
  );
}

export default Groups;
