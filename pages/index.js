import Link from 'next/link';
import { useEffect } from 'react';
import Header from './layouts/Header';
import { Button } from 'reactstrap';
import { getById } from '../lib/sites';

function Home({ data, categories }) {
  return (
    <div>
      <Header site={data} categories={categories} />
      <main className="container">
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Link href="/sites"><Button color="primary">View All Stores</Button></Link>
        <Link href="/catalog"><Button color="secondary">View Inventory/Search</Button></Link>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // data = await getById(defaultStoreId);
  return {
    props: {
      // data,
    }
  }
}


export default Home