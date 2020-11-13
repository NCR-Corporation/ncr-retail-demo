import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Catalog({ data }) {
  console.log('the data', data);
  const catalog = data.data.pageContent;
  // TODO: Fix if no content
  return (
    <div className="mt-4">
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalog.map((item) => (
            <tr key={item.itemId.itemCode}>
              <td scope="row">{item.itemId.itemCode}</td>
              <td><strong>{item.shortDescription.value}</strong></td>
              <td>{item.status}</td>
              <td><Button color="primary"><FontAwesomeIcon icon={faPen} /></Button></td>
            </tr>
            // <a key={item.itemId.itemCode} href={`/catalog/${item.itemId.itemCode}`} className="list-group-item list-group-item-action">
            //   <div className="d-flex w-100 justify-content-between">
            //     <h5 className="mb-1">{item.shortDescription.value}</h5>
            //     <small>{item.status}</small>
            //   </div>
            //   <small>{item.itemId.itemCode}</small>
            // </a>
          ))}

        </tbody>
      </Table>
    </div>
  )
}

export default Catalog;