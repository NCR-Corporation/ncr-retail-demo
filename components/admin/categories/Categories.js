import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';
import LoadingTable from '../LoadingTable';

function Categories({ categories, isLoading, isError }) {
  return (
    <div className="pb-4">
      <div className="bg-white pb-2">
        <Table responsive hover striped={!isLoading && !isError} size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Parent</th>
              <th>Tag</th>
              <th>Status</th>
              <th>Department Sale</th>
              <th>Department Node</th>
              <th></th>
            </tr>
          </thead>
          {!isLoading && !isError ? (
            <tbody>
              {categories &&
                categories.map((item) => (
                  <tr key={item.nodeId.nodeId}>
                    <th scope="row">{item.nodeId.nodeId}</th>
                    <td>{item.title.value}</td>
                    <td>{item.parentId && item.parentId.nodeId}</td>
                    <td>{item.tag}</td>
                    <td>{item.status}</td>
                    <td>{`${item.departmentSale}`}</td>
                    <td>{`${item.departmentNode}`}</td>
                    <td>
                      <>
                        <a href={`/admin/category/${item.nodeId.nodeId}`}>
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
        {categories.length == 0 && !isLoading && !isError && <p className="text-center">No categories found.</p>}
      </div>
    </div>
  );
}

export default Categories;
