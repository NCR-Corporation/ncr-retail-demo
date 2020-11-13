import Link from 'next/link';
import Header from './layouts/Header';
import cookie from 'cookie';
import { Button } from 'reactstrap';
import { getById } from '../lib/sites';
import { getAllCategoryNodes } from '../lib/category';

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
  let cookies;
  let data = null;
  let defaultStoreId = '5b0c5bec0a1b46ab86182cf3e612dd5b';
  // if (context.req && context.req.headers && context.req.headers.cookie) {
  //   console.log(context.req.headers.cookie);
  //   // cookies = cookie.parse(context.req.headers.cookie);
  //   // console.log('cookies', cookies);
  data = await getById(defaultStoreId);
  // }
  // console.log(data);
  const categories = await getAllCategoryNodes();
  return {
    props: {
      // cookies,
      data,
      categories
    }
  }
}


export default Home