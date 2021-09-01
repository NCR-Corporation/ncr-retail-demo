import { useContext } from 'react';
import Footer from '~/components/public/Footer';
import Header from '~/components/public/Header';
import { UserStoreContext } from '~/context/userStore';
import HomeCarousel from '~/components/public/home/HomeCarousel';
import HomeAboutCards from '~/components/public/home/HomeAboutCards';
import HomeGroups from '~/components/public/home/HomeGroups';
import HomeMap from '~/components/public/home/HomeMap';
import HomeQuote from '~/components/public/home/HomeQuote';
import { useFetch } from '~/lib/hooks/useFetch';

import { getCategoryNodesForMenu } from '~/lib/category';

function Home({ categories, logs = [] }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isError, isLoading } = useFetch('/api/groups');

  return (
    <div className="d-flex flex-column main-container">
      <Header categories={categories} logs={data && data.logs ? logs.concat(data.logs) : []} />
      <HomeCarousel />
      <div className="container my-4 flex-grow-1">
        <div>
          <HomeAboutCards />
          {isError && (
            <small className="text-muted center">
              {`Uhoh, we've hit an error.`}
              <code>{JSON.stringify(isError.info)}</code>
            </small>
          )}
          <HomeGroups isError={isError} isLoading={isLoading} userStore={userStore} data={data} />
          <HomeQuote />
          <div id="stores" className="my-5">
            <HomeMap />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await getCategoryNodesForMenu();
  const { categories, logs } = JSON.parse(JSON.stringify(response));
  console.log(categories);
  console.log(logs);
  return {
    props: {
      // categories,
      // logs
    }
  };
}

export default Home;
