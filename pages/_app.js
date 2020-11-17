import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css';
import { getAllCategoryNodes } from '../lib/category';
import { UserStoreProvider } from "../context/AppContext";

function MyApp({ Component, pageProps, categories }) {
  return (
    <UserStoreProvider>
      <Component {...pageProps} categories={categories} />
    </UserStoreProvider>
  );
}

MyApp.getInitialProps = async () => {
  const categories = await getAllCategoryNodes();
  return { categories };
}

export default MyApp
