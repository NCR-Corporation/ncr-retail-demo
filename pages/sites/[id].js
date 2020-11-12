import Header from '../layouts/Header';
import { getById, getByReferenceId } from '../../lib/sites';
import { Button } from 'reactstrap';
import cookieCutter from 'cookie-cutter';

export default function Site({ site }) {

  const setAsMyStore = () => {
    cookieCutter.set('defaultStoreReferenceId', site.referenceId);
    cookieCutter.set('defaultStoreId', site.id);
    console.log('site id', site.id);
  }

  return (
    <div>
      <Header />
      <div className="container">
        {site.statusCode === 404 && <h1>404 Not Found</h1>}
        <code>{JSON.stringify(site)}</code>
        <Button onClick={setAsMyStore}>Set as my store</Button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const site = await getById(context.params.id)
  return {
    props: {
      site
    }
  }

}