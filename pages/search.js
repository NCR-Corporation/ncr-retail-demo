import { Button } from 'reactstrap';
import { findNearby } from '~/lib/sites';
import Header from '~/components/public/Header';

function Search() {
  return (
    <div className="d-flex flex-column main-container">
      <Header />
      <div className="container">
        <p>Searching store: {localStorage.getItem('defaultStore')}</p>
        <Button>Search Item</Button>
      </div>
    </div>
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
