import Link from 'next/link';
import { getSites } from '../lib/sites';
import Header from '../components/public/Header';

export default function Sites({ data, categories }) {
  const sites = data.data.pageContent;
  return (
    <div>
      <Header categories={categories} />
      <div className="container">
        <h1>Stores</h1>
        <ul>
          {sites.map((site) => (
            <li key={site.id}>
              <Link href={`/sites/${site.id}`}>{site.siteName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await getSites();
  return {
    props: {
      data,
    },
  };
}
