import { useContext, useState } from 'react';
import Footer from '~/components/public/Footer';
import Header from '~/components/public/Header';
import useHomepage from '~/lib/hooks/useHomepage';
import { UserStoreContext } from '~/context/userStore';
import HomeCarousel from '~/components/public/home/HomeCarousel';
import HomeAboutCards from '~/components/public/home/HomeAboutCards';
import HomeGroups from '~/components/public/home/HomeGroups';
import HomeMap from '~/components/public/home/HomeMap';
import HomeQuote from '~/components/public/home/HomeQuote';
import ConfigurationModal from '~/components/public/ConfigurationModal';

import { getCategoryNodesForMenu } from '~/lib/category';

function Home({ categories, configured }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useHomepage(userStore.id);
  const [isConfigured, setIsConfigured] = useState(configured);
  const toggleConfigurationModal = () => setIsConfigured(!isConfigured);
  return (
    <div className="d-flex flex-column main-container">
      <ConfigurationModal
        modalProp={!isConfigured}
        toggle={toggleConfigurationModal}
      />
      <Header
        categories={categories}
        logs={data && data.logs ? data.logs : []}
        configured={configured}
      />
      <HomeCarousel />
      <main className="container my-4 flex-grow-1">
        <div>
          <HomeAboutCards />
          {isError && (
            <small className="text-muted center">
              Uhoh, we've hit an error.
              <code>{JSON.stringify(isError.info)}</code>
            </small>
          )}
          <HomeGroups
            isError={isError}
            isLoading={isLoading}
            userStore={userStore}
            data={data}
          />
          <HomeQuote />
          <div id="stores" className="my-5">
            <HomeMap />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const { categories, logs } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      logs,
      configured: process.env.REACT_APP_CONFIGURED
        ? process.env.REACT_APP_CONFIGURED
        : false,
    },
    revalidate: 60,
  };
}

export default Home;
