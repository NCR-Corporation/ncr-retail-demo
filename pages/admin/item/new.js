import Header from '../layouts/Header';

export default function New({ }) {
  return (
    <div>
      <Header />
      <main className="container">
        <form>
          <div className="form-group">
            <label htmlFor="itemId">Item Id</label>
            <input type="text" className="form-control" id="itemId" />
            <small id="itemId" className="form-text text-muted">
              Will be used as the referenceId also.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="shortDescription">Short Description (Name)</label>
            <input type="text" className="form-control" id="shortDescription" />
          </div>
          <div className="form-group">
            <label htmlFor="longDescription">Long Description</label>
            <input type="text" className="form-control" id="longDescription" />
          </div>
          <div className="form-group">
            <label htmlFor="merchandiseCategory">Merchandise Category</label>
            <select className="form-control" id="status">
              <option>Active</option>
              <option>Inactive</option>
              <option>Discontinued</option>
              <option>Seasonal</option>
              <option>To Discontinue</option>
              <option>Unauthorized</option>
            </select>
            <small id="parentId" className="form-text text-muted">
              Select the deepest/most specific category.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select className="form-control" id="status">
              <option>Active</option>
              <option>Inactive</option>
              <option>Discontinued</option>
              <option>Seasonal</option>
              <option>To Discontinue</option>
              <option>Unauthorized</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="packageIdentifier">Package Identifier</label>
            <input type="text" className="form-control" id="packageIdentifier" placeholder="TBD" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="alternateCategories">Alternate Categories</label>
            <input type="text" className="form-control" id="alternateCategories" placeholder="TBD" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="departmentId">Department Id</label>
            <input type="text" className="form-control" id="departmentId" placeholder="TBD" disabled required />
          </div>
          <div className="form-group">
            <label htmlFor="nonMerchandise">nonMerchandise</label>
            <input type="text" className="form-control" id="nonMerchandise" placeholder="TBD" disabled required />
          </div>
          <div className="form-group">
            <label htmlFor="familyCode">familyCode</label>
            <input type="text" className="form-control" id="familyCode" placeholder="TBD" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="externalIdentifiers">externalIdentifiers</label>
            <input type="text" className="form-control" id="externalIdentifiers" placeholder="TBD" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="dynamicAttributes">dynamicAttributes</label>
            <input type="text" className="form-control" id="dynamicAttributes" placeholder="TBD" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="posNumber">posNumber</label>
            <input type="text" className="form-control" id="posNumber" placeholder="TBD" disabled />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </main>
    </div >
  )
}