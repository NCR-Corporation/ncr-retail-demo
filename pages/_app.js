import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '~/styles/style.css';
import { UserStoreProvider } from '~/context/userStore';
import { UserCartProvider } from '~/context/userCart';

export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log(metric);
  }
}

function MyApp({ Component, pageProps, categories }) {
  return (
    <UserStoreProvider>
      <UserCartProvider>
        <Head>
          <title>MART | Sample Retail Demo</title>
        </Head>
        <Component {...pageProps} categories={categories} />
      </UserCartProvider>
    </UserStoreProvider>
  );
}
export default MyApp;
