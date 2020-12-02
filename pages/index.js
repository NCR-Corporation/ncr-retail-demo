import { useContext } from 'react';
import { Jumbotron, Row, Col, Spinner } from 'reactstrap';
import Header from '~/components/public/Header';
import useCatalog from '~/lib/hooks/useCatalog';
import ItemCard from '~/components/public/ItemCard';
import { UserStoreContext } from '~/context/userStore';
import { signIn, signOut, useSession } from 'next-auth/client';

function Home() {
  const { userStore } = useContext(UserStoreContext);
  const { catalogItems, isLoading, isError } = useCatalog(userStore.id);
  const [session, loading] = useSession();
  return (
    <div>
      <Header />
      <main className="container mt-4">
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
        {isLoading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}

        {isError && (
          <small className="text-muted center">Uhoh, we've hit an error.</small>
        )}
        {!isLoading && !isError && (
          <div>
            <Jumbotron>
              <h1 className="display-4">Latest Items</h1>
            </Jumbotron>
            <Row>
              {catalogItems.data.pageContent.map((item) => (
                <Col
                  xs="6"
                  sm="4"
                  className="mb-4"
                  key={item.item.itemId.itemCode}
                >
                  <ItemCard catalogItem={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
