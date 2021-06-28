import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingTable from '~/components/admin/LoadingTable';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';

function Catalog({ data, isLoading, isError }) {
  const catalog = data.length == 0 ? data : data.data.pageContent;

  return (
    <div>
      <div className="bg-white pb-2">
        <Table responsive hover striped={!isLoading && !isError} size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {!isError && !isLoading ? (
            <tbody>
              {catalog.map((item) => (
                <tr key={item.itemId.itemCode}>
                  <th scope="row">{item.itemId.itemCode}</th>
                  <td>{item.shortDescription.value}</td>
                  <td>{item.status}</td>
                  <td>
                    <>
                      <a href={`/admin/catalog/${item.itemId.itemCode}`}>
                        <FontAwesomeIcon icon={faEdit} color="darkslategray" />
                      </a>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            !isError && <LoadingTable />
          )}
        </Table>
        {catalog.length == 0 && !isLoading && !isError && <p className="text-center">No catalog items found.</p>}
      </div>
    </div>
  );
}

export default Catalog;
