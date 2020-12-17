import { Container } from 'reactstrap';
import Header from '~/components/admin/Header';
import GroupForm from '~/components/admin/groups/GroupForm';

const EditGroup = ({ groupId }) => {
  return (
    <div className="bg pb-4">
      <Header />
      <Container className="my-4 flex-grow-1">
        <GroupForm id={groupId} />
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      groupId: context.params.id,
    },
  };
}

export default EditGroup;
