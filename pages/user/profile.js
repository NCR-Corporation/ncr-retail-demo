import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import useUser from '~/lib/swr/useUser';
import Sidebar from '~/components/public/user/Sidebar';
import { Col, Row, Spinner } from 'reactstrap';
import ProfileForm from '~/components/public/user/ProfileForm';
import Layout from '~/components/public/Layout';

const Settings = ({ session }) => {
  let { data, isLoading, isError } = useUser(session);
  const router = useRouter();
  const [logs, setLogs] = useState(data && data.logs ? data.logs : []);

  if (isLoading) {
    return (
      <Layout title="Profile">
        <main className="container my-4 flex-grow-1">
          <Row>
            <Col md="3">
              <Sidebar url="profile" />
            </Col>
            <Col>
              <div className="my-4 d-flex justify-content-center">
                <Spinner color="dark" />
              </div>
            </Col>
          </Row>
        </main>
      </Layout>
    );
  }
  if (isError) {
    router.push({
      pathname: '/auth/login',
      query: { redirect: '/user/profile' }
    });
  }

  return (
    <Layout logs={logs.length > 0 ? logs : data.logs}>
      <main className="container my-4 flex-grow-1">
        {data && data.data && (
          <Row>
            <Col md="3">
              <Sidebar url="profile" />
            </Col>
            <Col>
              <ProfileForm user={data} session={session} logs={data.logs} setLogs={setLogs} />
            </Col>
          </Row>
        )}
      </main>
    </Layout>
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
        permanent: false
      }
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}

export default Settings;
