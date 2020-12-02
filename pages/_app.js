import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '~/styles/style.css';
import { Provider } from 'next-auth/client';
import { UserStoreProvider } from '~/context/userStore';
import { UserCartProvider } from '~/context/userCart';

export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log(metric);
  }
}

function MyApp({ Component, pageProps, categories }) {
  return (
    <Provider session={pageProps.session}>
      <UserStoreProvider>
        <UserCartProvider>
          <Head>
            <title>MARKET | Sample Retail Demo</title>
          </Head>
          <Component {...pageProps} categories={categories} />
        </UserCartProvider>
      </UserStoreProvider>
    </Provider>
  );
}
export default MyApp;
