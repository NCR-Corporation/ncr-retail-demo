import OrderForm from '~/components/admin/orders/OrderForm';
import Layout from '~/components/admin/Layout';

const EditOrder = ({ orderId }) => {
  return (
    <Layout activeTab="orders">
      <OrderForm orderId={orderId} />
    </Layout>
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
