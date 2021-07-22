import Head from 'next/head';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';

const Layout = ({ logs = [], title = 'Home', children }) => {
  return (
    <div className="d-flex flex-column main-container">
      <Head>
        <title>MART | {title}</title>
      </Head>
      <Header logs={logs} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
