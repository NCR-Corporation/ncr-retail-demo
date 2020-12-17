import { Container } from 'reactstrap';
import GroupForm from '~/components/admin/groups/GroupForm';
import Header from '~/components/admin/Header';

const NewGroup = () => {
  return (
    <div className="bg pb-4">
      <Header />
      <Container className="my-4 flex-grow-1">
        <GroupForm />
      </Container>
    </div>
  );
};

export default NewGroup;
