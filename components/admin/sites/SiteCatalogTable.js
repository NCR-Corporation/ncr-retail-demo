import { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import SiteCatalogItemForm from './SiteCatalogItemForm';

export default function SiteCatalogTable({
  catalog,
  siteId,
  fetchUpdatedCatalog,
}) {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState();

  const onDismiss = () => setVisible(false);
  const [showAlert, setShowAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = (item) => {
    setItem(item);
    setModal(!modal);
  };

  const columns = [
    {
      dataField: 'item.itemId.itemCode',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'item.shortDescription.values[0].value',
      sort: true,
      text: 'Name',
    },
    {
      dataField: 'item.longDescription.values[0].value',
      sort: true,
      text: 'Long',
    },
    {
      dataField: 'item.merchandiseCategory.nodeId',
      sort: true,
      text: 'Merchandise',
    },
    {
      dataField: 'itemAttributes.groups[0].groupCode',
      sort: true,
      text: 'Groups',
    },
    {
      dataField: 'itemPrices[0].price',
      sort: true,
      text: 'Price',
      headerStyle: {
        width: '80px',
      },
    },
    {
      dataField: 'itemAttributes.imageUrls[0]',
      sort: true,
      text: 'Image',
    },
    // {
    //   dataField: 'itemAttributes.status',
    //   sort: true,
    //   text: 'Status',
    // },
    {
      dataField: '',
      text: '',
      headerStyle: {
        width: '60px',
      },
      formatter: (rowContent, row) => {
        return (
          <FontAwesomeIcon
            key={row.item.itemId.itemCode}
            icon={faEdit}
            size="sm"
            className="pointer"
            onClick={() => toggle(row)}
          />
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'itemId.itemCode',
      order: 'asc',
    },
  ];
  const showAlertMessage = ({ status, message }) => {
    toggle(null);
    setShowAlert({ status, message });
    setVisible(true);
    fetchUpdatedCatalog();
  };
  return (
    <div className="bg-white">
      <Modal isOpen={modal} toggle={() => toggle(null)}>
        {item && (
          <SiteCatalogItemForm
            siteId={siteId}
            toggle={toggle}
            itemObject={item}
            setShowAlert={showAlertMessage}
          />
        )}
      </Modal>
      <Alert
        toggle={onDismiss}
        isOpen={visible}
        className="my-4"
        color={showAlert.status == 204 ? 'success' : 'danger'}
      >
        {showAlert.message}
      </Alert>
      <BootstrapTable
        bootstrap4
        keyField="item.itemId.itemCode"
        data={catalog.data.pageContent}
        columns={columns}
        hover
        defaultSorted={defaultSorted}
        noDataIndication="No catalog items found"
      />
    </div>
  );
}
