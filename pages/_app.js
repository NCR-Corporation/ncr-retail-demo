
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../styles/header.css';
import { UserStoreProvider } from "../context/AppContext";

function MyApp({ Component, pageProps, categories }) {
  return (
    <UserStoreProvider>
      <Component {...pageProps} categories={categories} />
    </UserStoreProvider>
  );
}
export default MyApp
