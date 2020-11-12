import Link from 'next/link';
import Header from './layouts/Header';
import Sites from './layouts/Sites';
import { findAllSites } from '../../lib/sites';

function Dashboard({ sites }) {
  return (
    <div>
      <Header />
      <main className="container">
        <div className="row mt-2">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <Link href="/admin/site/new" className="btn btn-primary">Create New Store</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <Link href="/admin/category/new" className="btn btn-primary">Create New Category</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <Link href="/admin/item/new" className="btn btn-primary">Create New Item</Link>
              </div>
            </div>
          </div>
        </div>
        <Sites data={sites} />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const sites = await findAllSites();
  console.log('sites', sites);
  return {
    props: {
      sites
    }
  }
}

export default Dashboard 