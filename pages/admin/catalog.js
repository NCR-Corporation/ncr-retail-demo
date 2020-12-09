import React, { useState } from 'react';
import Header from '~/components/admin/Header';
import Catalog from '~/components/admin/catalog/Catalog';

import { Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import NavigationTabs from '~/components/admin/NavigationTabs';

const CatalogTab = () => {
  let { data, isLoading, isError } = useDashboard('catalog');

  return (
    <div>
      <Header />
      <main className="container my-4 flex-grow-1">
        <NavigationTabs activeTab="catalog" />
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Catalog data={data} />}
      </main>
    </div>
  );
};

export default CatalogTab;
