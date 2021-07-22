import { useContext } from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import useGroupItems from '~/lib/swr/useGroupItems';
import { UserStoreContext } from '~/context/userStore';
import { getCategoryNodesForMenu } from '~/lib/category';
import GroupHeader from '~/components/public/group/GroupHeader';
import GroupCatalogItems from '~/components/public/group/GroupCatalogItems';

export default function Group({ categories, id }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useGroupItems(id, userStore.id);

  return (
    <div className="d-flex flex-column main-container">
      <Header categories={categories} logs={data && data.logs ? data.logs : []} />
      <GroupHeader isLoading={isLoading} data={data} />
      <GroupCatalogItems isLoading={isLoading} data={data} isError={isError} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { categories } = await getCategoryNodesForMenu();
  return {
    props: {
      categories,
      id: context.query.id
    }
  };
}
