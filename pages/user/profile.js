import { useEffect, useState } from 'react';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { getSession } from 'next-auth/client';
import useUser from '~/lib/hooks/useUser';
import Sidebar from '~/components/public/user/Sidebar';
import { Button, Col, Row, Spinner } from 'reactstrap';
import ProfileForm from '~/components/public/user/ProfileForm';
import LoginModal from '~/components/auth/LoginModal';
import RegisterConsumerModal from '~/components/auth/RegisterConsumerModal';

const Settings = ({ session }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  const toggleRegisterModal = () => setRegisterModalOpen(!isRegisterModalOpen);
  let { user, isLoading, isError } = useUser(session);
  if (!isLoading && !isError) {
    console.log(user);
    if (user.status == 500) {
      // setLoginModalOpen(true);
      isError = true;
    }
  }

  return (
    <div>
      <LoginModal
        modalProp={isLoginModalOpen}
        toggle={toggleLoginModal}
        toggleRegister={toggleRegisterModal}
      />
      <RegisterConsumerModal
        modalProp={isRegisterModalOpen}
        toggle={toggleRegisterModal}
        toggleLogin={toggleLoginModal}
      />
      <Header />
      <main className="container my-4">
        {isLoading && (
          <div className="my-4 d-flex justify-content-center">
            <Spinner color="dark" />
          </div>
        )}
        {isError && (
          <div>
            <small className="text-muted">Uhoh, we've hit an error.</small>
            <br />
            <Button
              size="sm"
              color="primary"
              onClick={() => setLoginModalOpen(true)}
            >
              Please login again.
            </Button>
          </div>
        )}
        {!isLoading && !isError && !user.data && (
          <small className="text-muted"></small>
        )}
        {!isLoading && !isError && user.data && (
          <Row>
            <Col md="3">
              <Sidebar url="profile" />
            </Col>
            <Col>
              <ProfileForm user={user} session={session} />
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

export default Settings;
