import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Sites from '~/components/admin/sites/Sites';

import useDashboard from '~/lib/hooks/useDashboard';
import Layout from '~/components/admin/Layout';

const SitesTab = () => {
  let { data, isLoading, isError } = useDashboard('sites');

  return (
    <Layout activeTab="sites">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sites</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <Link href="/admin/sites/new" passHref>
              <button type="button" className="btn btn-sm btn-outline-secondary">
                <FontAwesomeIcon icon={faPlus} size="1x" /> New Site
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isError && <small className="text-muted">{`Uhoh, we've hit an error.`}</small>}
      <Sites isLoading={isLoading} isError={isError} data={data && data.sites && data.sites.status == 200 ? data.sites : []} />
    </Layout>
  );
};

export default SitesTab;
