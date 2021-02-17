import Header from '~/components/admin/Header';
import Sites from '~/components/admin/sites/Sites';

import { Spinner, Container } from 'reactstrap';
import useDashboard from '~/lib/hooks/useDashboard';

const SitesTab = () => {
  let { data, isLoading, isError } = useDashboard('sites');

  return (
    <div>
      <Header navigation={true} activeTab="sites" />
      <Container fluid className="w-75 my-2 flex-grow-1">
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <small className="text-muted">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && <Sites data={data.sites ?? []} />}
      </Container>
    </div>
  );
};

export default SitesTab;
