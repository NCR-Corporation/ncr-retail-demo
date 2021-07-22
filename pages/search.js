import { Button } from 'reactstrap';
import { findNearby } from '~/lib/sites';
import Layout from '~/components/admin/Layout';

function Search() {
  return (
    <Layout>
      <div className="container">
        <p>Searching store: {localStorage.getItem('defaultStore')}</p>
        <Button>Search Item</Button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const sites = await findNearby(0, 0);
  return {
    props: {
      sites
    }
  };
}

export default Search;
