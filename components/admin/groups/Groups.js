import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Table } from 'reactstrap';

function Groups({ data }) {
  const groups = data.data && data.data.pageContent.length > 0 ? data.data.pageContent : [];

  return (
    <div className="pb-4">
      <div className="text-right my-2">
        <Link href="/admin/groups/new">
          <a className="btn btn-primary">New Group</a>
        </Link>
      </div>

      <div className="bg-white">
        <Table responsive hover bordered>
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
      </div>
    </div>
  );
}

export default Groups;
