import GroupForm from '~/components/admin/groups/GroupForm';
import Layout from '~/components/admin/Layout';

const NewGroup = () => {
  return (
    <Layout activeTab="groups">
      <GroupForm />
    </Layout>
  );
};

export default NewGroup;
