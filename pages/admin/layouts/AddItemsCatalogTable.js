import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'reactstrap';

export default function AddItemsCatalogTable({ catalog, setSelected }) {
  const columns = [{
    dataField: "itemId.itemCode",
    text: "ID"
  }, {
    dataField: "shortDescription.value",
    text: "Name"
  }];

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#eee',
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelected({ 'item': catalog[rowIndex], 'index': rowIndex });
    },
    selectionRenderer: ({ mode, checked, disabled }) => {
      return (<Button size="sm">+</Button>)
    }
  }

  return (
    <div>
      <BootstrapTable
        keyField='itemId.itemCode'
        data={catalog}
        columns={columns}
        selectRow={selectRow}
      />
    </div>
  );
}
