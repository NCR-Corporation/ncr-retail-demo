import { useState } from 'react';
import Head from 'next/head';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { getSession } from 'next-auth/client';
import useUser from '~/lib/hooks/useUser';
import Sidebar from '~/components/public/user/Sidebar';
import { Col, Row, Spinner } from 'reactstrap';
import ProfileForm from '~/components/public/user/ProfileForm';
import LoginModal from '~/components/auth/LoginModal';
import RegisterConsumerModal from '~/components/auth/RegisterConsumerModal';
import { getCategoryNodesForMenu } from '~/lib/category';

const Settings = ({ categories, session }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  const toggleRegisterModal = () => setRegisterModalOpen(!isRegisterModalOpen);
  let { data, isLoading, isError } = useUser(session);
  const [logs, setLogs] = useState(data && data.logs ? data.logs : []);
  if (isLoading) {
    return (
      <div className="d-flex flex-column main-container">
        <Head>
          <title>MART | Profile</title>
        </Head>
        <Header categories={categories} />
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
        <Footer />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="d-flex flex-column main-container">
        <Head>
          <title>MART | Profile</title>
        </Head>
        <Header categories={categories} />
        <LoginModal
          modalProp={isRegisterModalOpen ? false : true}
          toggle={toggleLoginModal}
          toggleRegister={toggleRegisterModal}
        />
        <RegisterConsumerModal
          modalProp={isRegisterModalOpen}
          toggle={toggleRegisterModal}
          toggleLogin={toggleLoginModal}
        />
        <main className="container my-4 flex-grow-1"></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column main-container">
      <Head>
        <title>MART | Profile</title>
      </Head>
      <Header
        categories={categories}
        logs={logs.length > 0 ? logs : data.logs}
      />
      <main className="container my-4 flex-grow-1">
        {data && data.data && (
          <Row>
            <Col md="3">
              <Sidebar url="profile" />
            </Col>
            <Col>
              <ProfileForm
                user={data}
                session={session}
                logs={data.logs}
                setLogs={setLogs}
              />
            </Col>
          </Row>
        )}
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get the user's session based on the request
  const session = await getSession(context);
  const { categories, logs } = await getCategoryNodesForMenu();
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
  return { props: { session, categories, logs } };
}

export default Settings;
