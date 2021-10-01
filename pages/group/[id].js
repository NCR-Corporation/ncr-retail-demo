import { useContext } from 'react';
import Layout from '~/components/public/Layout';
import useGroupItems from '~/lib/swr/useGroupItems';
import { UserStoreContext } from '~/context/userStore';
import GroupHeader from '~/components/public/group/GroupHeader';
import GroupCatalogItems from '~/components/public/group/GroupCatalogItems';

export default function Group({ id }) {
  const { userStore } = useContext(UserStoreContext);
  const { data, isLoading, isError } = useGroupItems(id, userStore.id);

  return (
    <Layout logs={data && data.logs ? data.logs : []} title={!isLoading && !isError ? data.group.data.title.values[0].value : ''}>
      <GroupHeader isLoading={isLoading} data={data} />
      <GroupCatalogItems isLoading={isLoading} data={data} isError={isError} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id
    }
  };
}
