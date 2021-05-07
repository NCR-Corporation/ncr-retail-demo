import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';

function Categories({ categories }) {
  return (
    <div className="pb-4">
      <div className="text-right my-2">
        <Link href="/admin/category/new">
          <a className="btn btn-primary">New Category</a>
        </Link>
      </div>
      <div className="bg-white">
        <Table responsive hover bordered>
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
          <tbody>
            {categories.map((item) => (
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
        </Table>
      </div>
    </div>
  );
}

export default Categories;
