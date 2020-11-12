import Link from 'next/link';
import { findAllSites } from '../lib/sites';
import Header from './layouts/Header';

export default function Sites({ data }) {
  console.log('the sites', data.pageContent);
  const sites = data.pageContent;
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Stores</h1>
        <ul>
          {sites.map((site) => (
            <li key={site.id}><Link href={`/sites/${site.id}`}>{site.siteName}</Link></li>
          ))}
        </ul>
      </div>
    </div >
  )
}

export async function getServerSideProps(context) {
  const data = await findAllSites();
  return {
    props: {
      data
    }
  }
}
