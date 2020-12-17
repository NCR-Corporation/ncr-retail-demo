import React, { useState } from 'react';
import Header from '~/components/admin/Header';
import Catalog from '~/components/admin/catalog/Catalog';

import { Container, Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import NavigationTabs from '~/components/admin/NavigationTabs';

const CatalogTab = () => {
  let { data, isLoading, isError } = useDashboard('catalog');

  return (
    <div>
      <Header navigation={true} activeTab="catalog" />
      <Container fluid className="w-75 my-4 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Catalog data={data} />}
      </Container>
    </div>
  );
};

export default CatalogTab;
