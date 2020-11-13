import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css';
import { getAllCategoryNodes } from '../lib/category';

function MyApp({ Component, pageProps, categories }) {
  return <Component {...pageProps} categories={categories} />
}

MyApp.getInitialProps = async () => {
  const categories = await getAllCategoryNodes();
  return { categories };
}

export default MyApp
