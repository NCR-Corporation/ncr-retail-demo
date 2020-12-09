import React, { useState } from 'react';
import Header from '~/components/admin/Header';
import Sites from '~/components/admin/sites/Sites';
import Categories from '~/components/admin/categories/Categories';
import Catalog from '~/components/admin/catalog/Catalog';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import NavigationTabs from '~/components/admin/NavigationTabs';

const CategoriesTab = () => {
  let { data, isLoading, isError } = useDashboard('category');

  return (
    <div>
      <Header />
      <main className="container my-4 flex-grow-1">
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
      </main>
    </div>
  );
};

export default CategoriesTab;
