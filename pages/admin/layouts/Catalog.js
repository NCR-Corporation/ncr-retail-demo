import { useState } from 'react';
import { Alert, Table, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

function Catalog({ data }) {
  const catalog = data.data.pageContent;

  const [selected, setSelected] = useState(null)
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  const toggle = () => setModal(!modal)

  const handleDelete = async (node) => {

    let selected = JSON.parse(JSON.stringify(node));
    selected.version = selected.version + 1;
    selected.status = "INACTIVE"
    let itemCode = selected.itemId.itemCode
    delete selected['itemId'];
    // this is dumb.
    let shortDescription = selected.shortDescription;
    let longDescription = selected.longDescription;
    delete selected['shortDescription'];
    delete selected['longDescription'];
    selected['shortDescription'] = { "values": [{ "locale": shortDescription.locale, "value": shortDescription.value }] };
    selected['longDescription'] = { "values": [{ "locale": longDescription.locale, "value": longDescription.value }] };
    fetch(`/api/items/${itemCode}`, { method: 'POST', body: JSON.stringify(selected) })
      .then(response => response.json())
      .then(data => {
        if (data.status == 204) {
          catalog[node.index].status = 'INACTIVE';
        }
        setVisible(true);
        toggle();
      });
  }

  // TODO: Fix if no content
  return (
    <div className="mt-4">
      {selected != null && visible && (<Alert isOpen={visible} toggle={onDismiss} color="success">
        Successfully marked as Inactive. Item will be deleted in 30 days.
      </Alert>)}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
        <ModalBody>
          {selected && <p><strong>Catalog Item #: </strong>{selected.item.shortDescription.value}</p>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDelete(selected.item)}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Table striped>
        <thead>
          <tr>
            <th>Version</th>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalog.map((item, key) => (
            <tr key={item.itemId.itemCode}>
              <td scope="row">{item.version}</td>
              <td scope="row">{item.itemId.itemCode}</td>
              <td><strong>{item.shortDescription.value}</strong></td>
              <td>{item.status}</td>
              <td>
                <Row>
                  <Col sm="6">
                    <Button color="primary">
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </Col>
                  <Col sm="6">
                    <Button onClick={() => { setSelected({ "index": key, item }); toggle(); }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}

        </tbody>
      </Table >
    </div >
  )
}

export default Catalog;