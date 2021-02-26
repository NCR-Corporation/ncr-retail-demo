import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '~/styles/style.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { Provider } from 'next-auth/client';
import { UserStoreProvider } from '~/context/userStore';
import { UserCartProvider } from '~/context/userCart';

import Metatags from '~/components/public/Metatags';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    // console.log(metric);
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <UserStoreProvider>
        <UserCartProvider>
          <Metatags>
            <Component {...pageProps} />
          </Metatags>
        </UserCartProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default MyApp;
