import Layout from '~/components/admin/Layout';
import GroupForm from '~/components/admin/groups/GroupForm';

const EditGroup = ({ groupId }) => {
  return (
    <Layout activeTab="groups">
      <GroupForm id={groupId} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      groupId: context.params.id
    }
  };
}

export default EditGroup;
