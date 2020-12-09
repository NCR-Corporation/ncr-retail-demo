import Header from '~/components/admin/Header';
import Sites from '~/components/admin/sites/Sites';

import { Spinner } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';
import NavigationTabs from '~/components/admin/NavigationTabs';

const SitesTab = () => {
  let { data, isLoading, isError } = useDashboard('sites');

  return (
    <div>
      <Header />
      <main className="container my-4 flex-grow-1">
        <NavigationTabs activeTab="sites" />
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Sites data={data} />}
      </main>
    </div>
  );
};

export default SitesTab;
