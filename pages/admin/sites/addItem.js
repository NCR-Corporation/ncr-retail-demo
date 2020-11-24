import React, { useEffect, useState } from 'react';
import Header from '../../components/public/Header';
import useSiteCatalog from '../../../context/useSiteCatalog';
import AddItemsCatalogTable from '../../../components/admin/AddItemsCatalogTable'
import AddItemDetailsModal from '../../../components/admin/AddItemDetailsModal';

export default function addItem({ id }) {
  const [selected, setSelected] = useState();
  const [catalogItems, setCatalogItems] = useState([]);
  if (catalogItems.length === 0) {
    fetch(`/api/sites/${id}/catalog`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const { site, siteCatalog, catalog } = data;
        setCatalogItems(Object.values(catalog))
      });
  }

  const refresh = () => {
    let updated = [...catalogItems];
    updated.splice(selected.index, 1);
    setCatalogItems(updated);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <a href={`/admin/sites/${id}`} className="btn btn-primary">Back to Site</a>
        <AddItemDetailsModal selectedItem={selected} siteId={id} refresh={refresh} />
        <AddItemsCatalogTable catalog={catalogItems} setSelected={setSelected} />
      </div>
    </div >
  );
}
export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id
    }
  }

}
