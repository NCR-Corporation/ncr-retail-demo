import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxes } from '@fortawesome/free-solid-svg-icons';
import LoadingTable from '~/components/admin/LoadingTable';
import Link from 'next/link';
import { Table } from 'reactstrap';

function Sites({ data, isLoading, isError }) {
  const sites = data.length == 0 ? data : data.data.pageContent;
  return (
    <div>
      <div className="bg-white pb-2">
        <Table responsive hover striped={!isLoading && !isError} size="sm">
          <thead>
            <tr>
              <th>Ref Id</th>
              <th>Name</th>
              <th>Status</th>
              <th>Edit Site</th>
              <th>Edit Site Catalog</th>
            </tr>
          </thead>
          {!isLoading && !isError ? (
            <tbody>
              {sites.map((item) => (
                <tr key={item.referenceId}>
                  <th scope="row">{item.referenceId}</th>
                  <td>{item.siteName}</td>
                  <td>{item.status}</td>
                  <td>
                    <a href={`/admin/sites/${item.id}`}>
                      <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
                    </a>
                  </td>
                  <td>
                    <a href={`/admin/sites/catalog/${item.id}`}>
                      <FontAwesomeIcon icon={faBoxes} color="darkslategrey" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            !isError && <LoadingTable />
          )}
        </Table>
        {sites.length == 0 && !isError && !isLoading && <p className="text-center">No sites found.</p>}
      </div>
    </div>
  );
}

export default Sites;
