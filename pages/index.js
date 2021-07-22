import { useContext } from 'react';
import { UserStoreContext } from '~/context/userStore';
import useHomepage from '~/lib/swr/useHomepage';
import HomeCarousel from '~/components/public/home/HomeCarousel';
import HomeAboutCards from '~/components/public/home/HomeAboutCards';
import HomeGroups from '~/components/public/home/HomeGroups';
import HomeMap from '~/components/public/home/HomeMap';
import HomeQuote from '~/components/public/home/HomeQuote';
import Layout from '~/components/public/Layout';

function Home() {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useHomepage(userStore.id);
  return (
    <Layout logs={data && data.logs ? data.logs : []}>
      <HomeCarousel />
      <main className="container my-4 flex-grow-1">
        <HomeAboutCards />
        <HomeGroups isError={isError} isLoading={isLoading} userStore={userStore} data={data} />
        <HomeQuote />
        <HomeMap />
      </main>
    </Layout>
  );
}

export default Home;
