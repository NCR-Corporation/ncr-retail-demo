import Link from 'next/Link';
import Header from '../layouts/Header';
import { Row, Col, Button } from 'reactstrap';
import { getCatalogItemByItemCode } from '../../lib/catalog';
import { getCatalogItemCategoryAncestorsByMerchandiseCategory } from '../../lib/category';

export default function Item({ data, ancestors, categories }) {
  const item = data.data;
  console.log(item);

  return (
    <div className="bg">
      <Header categories={categories} />
      <div className="container pt-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            {ancestors.data.nodes.reverse().map((ancestor) => (
              <li class="breadcrumb-item"><Link href={`/category/${ancestor.nodeCode}`}>{ancestor.title.value}</Link></li>
            ))}
          </ol>
        </nav>
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-sm-4">
              <img width="100%" src="https://target.scene7.com/is/image/Target/GUEST_02227710-3cd3-43e8-8f46-af4c7f95bb8f?wid=700&hei=700&qlt=80&fmt=webp" alt="Card image cap" />
            </div>
            <div className="col-sm-6">
              <div className="card-body h-100 d-flex flex-column bd-highlight pb-5">
                <div class="p-2 bd-highlight">
                  <h2 className="card-title">{item.shortDescription.values[0].value}</h2>
                </div>
                <div class="p-2 bd-highlight">
                  <h6 class="card-subtitle mb-2 text-muted"><strong>Item #:</strong> {item.itemId.itemCode}</h6>
                  <p className="card-text">{item.longDescription.values[0].value} // Long description</p>
                </div>
                <div class="mt-auto p-2 bd-highlight">
                  <div class="d-flex bd-highlight mb-3">
                    <div class="p-2 bd-highlight">
                      <h3 class="text-muted">$10.00</h3>
                    </div>
                    <div class="ml-auto p-2 bd-highlight"><Button color="primary">Add to Cart</Button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export async function getServerSideProps(context) {
  const data = await getCatalogItemByItemCode(context.params.id)
  const ancestors = await getCatalogItemCategoryAncestorsByMerchandiseCategory(data.data.merchandiseCategory.nodeId);
  return {
    props: {
      data,
      ancestors
    }
  }

}