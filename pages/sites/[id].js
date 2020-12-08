import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { getById } from '~/lib/sites';

export default function Site({ site, categories }) {
  return (
    <div>
      <Header categories={categories} />
      <div className="container">
        {site.statusCode === 404 && <h1>404 Not Found</h1>}
        <code>{JSON.stringify(site)}</code>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const site = await getById(context.params.id);
  return {
    props: {
      site,
    },
  };
}
