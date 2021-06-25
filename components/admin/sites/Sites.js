import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Table } from 'reactstrap';

function Sites({ data }) {
  const sites = data.length == 0 ? data : data.data.pageContent;
  return (
    <div>
      <div className="bg-white pb-2">
        <Table responsive hover striped size="sm">
          <thead>
            <tr>
              <th>Ref Id</th>
              <th>Name</th>
              <th>Status</th>
              <th>Edit Site</th>
              <th>Edit Site Catalog</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((item) => (
              <tr key={item.referenceId}>
                <th scope="row">{item.referenceId}</th>
                <td>{item.siteName}</td>
                <td>{item.status}</td>
                <td>
                  <Link href={`/admin/sites/${item.id}`}>
                    <a>
                      <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
                    </a>
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/sites/catalog/${item.id}`}>
                    <a>
                      <FontAwesomeIcon icon={faBoxes} color="darkslategrey" />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {sites.length == 0 && <p className="text-center">No sites found.</p>}
      </div>
    </div>
  );
}

export default Sites;
