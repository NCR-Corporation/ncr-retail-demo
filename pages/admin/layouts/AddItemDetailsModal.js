import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import ItemPriceForm from './ItemPriceForm';

const AddItemDetailsModal = ({ selectedItem, siteId, refresh }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleAndRefresh = () => {
    toggle();
    refresh();
  }
  return (
    <div>
      <Button color="danger" onClick={toggle} disabled={!selectedItem && true}>+ Add {selectedItem && selectedItem.item.shortDescription.value}</Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Items</ModalHeader>
        <ModalBody>
          {selectedItem &&
            <ItemPriceForm selectedItem={selectedItem.item} siteId={siteId} toggleAndRefresh={toggleAndRefresh} />
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddItemDetailsModal;