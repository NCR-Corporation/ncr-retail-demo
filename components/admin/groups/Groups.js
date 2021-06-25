import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Table } from 'reactstrap';

function Groups({ data }) {
  const groups = data.data && data.data.pageContent.length > 0 ? data.data.pageContent : [];

  return (
    <div>
      <div className="bg-white pb-2">
        <Table responsive hover striped size="sm">
          <thead>
            <tr>
              <th>Group Code</th>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((item) => (
              <tr key={item.groupId.groupCode}>
                <th scope="row">{item.groupId.groupCode}</th>
                <td>{item.title.value}</td>
                <td>{item.status}</td>
                <td>
                  <Link href={`/admin/groups/${item.groupId.groupCode}`}>
                    <a>
                      <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {groups.length == 0 && <p className="text-center">No groups found.</p>}
      </div>
    </div>
  );
}

export default Groups;
