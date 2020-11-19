import BootstrapTable from 'react-bootstrap-table-next';

export default function SiteCatalogTable({ catalog }) {
  const columns = [{
    dataField: "itemId.itemCode",
    text: "ID"
  }, {
    dataField: "shortDescription.value",
    text: "Name"
  }, {
    dataField: "price.price",
    text: "Price"
  }];

  const expandRow = {
    renderer: row => (
      <div>
        <p>{`This expand row belongs to rowKey ${row.id}`}</p>
      </div>
    ),
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <b>-</b>;
      }
      return <b>+</b>;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return (
          <b>-</b>
        );
      }
      return (
        <b>+</b>
      );
    }
  }

  return (
    <div>
      <BootstrapTable
        keyField='itemId.itemCode'
        data={catalog}
        columns={columns}
        expandRow={expandRow}
      />
    </div>
  );
}
