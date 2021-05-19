import OrderForm from '~/components/admin/orders/OrderForm';
import Header from '~/components/admin/Header';
import { Container } from 'reactstrap';

const EditOrder = ({ orderId }) => {
  return (
    <div className="bg pb-4">
      <Header />
      <Container className="my-4 flex-grow-1">
        <OrderForm orderId={orderId} />
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      orderId: context.params.id
    }
  };
}

export default EditOrder;
