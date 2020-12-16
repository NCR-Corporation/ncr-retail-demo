import React, { useState } from 'react';
import Header from '~/components/admin/Header';
import Categories from '~/components/admin/categories/Categories';

import { Container, Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import NavigationTabs from '~/components/admin/NavigationTabs';

const CategoriesTab = () => {
  let { data, isLoading, isError } = useDashboard('category');

  return (
    <div>
      <Header navigation={false} />
      <Container fluid className="w-75 my-4 flex-grow-1">
        <NavigationTabs activeTab="categories" />
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Categories categories={data} />}
      </Container>
    </div>
  );
};

export default CategoriesTab;
