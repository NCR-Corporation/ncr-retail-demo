import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';

function Catalog({ data }) {
  const catalog = data.length == 0 ? data : data.data.pageContent;

  return (
    <div>
      <div className="bg-white pb-2">
        <Table responsive hover stiped size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
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
        </Table>
        {catalog.length == 0 && <p className="text-center">No catalog items found.</p>}
      </div>
    </div>
  );
}

export default Catalog;
