import Header from '~/components/public/Header';
import { getSession } from 'next-auth/client';
import useUser from '~/lib/hooks/useUser';
import Sidebar from '~/components/public/user/Sidebar';
import { Col, Row, Spinner } from 'reactstrap';

const Payments = ({}) => {
  return (
    <div>
      <Header />
      <main className="container pt-4">
        <Row>
          <Col md="3">
            <Sidebar url="payments" />
          </Col>
          <Col></Col>
        </Row>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const session = await getSession(context);
  if (!session) {
    console.log("We've lost the session");
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}

export default Payments;
