
import { useRouter } from 'next/router';
import Header from '../layouts/Header';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CatalogForm = ({ item, categoriesData }) => {
  console.log('the item', item);
  const router = useRouter();

  let categories = [];
  if (categoriesData.data) {
    categoriesData.data.pageContent.forEach(category => {
      categories.push({ id: category.nodeCode, title: category.title.value });
    });
  }

  const initialValues = {
    itemId: '',
    shortDescription: '',
    longDescription: '',
    merchandiseCategory: '',
    status: '',
    departmentId: 'NA',
    nonMerchandise: false,

  }

  // TODO: Add all validation.
  const createItemSchema = Yup.object().shape({
    itemId: Yup.string().required('Item id is required'),
    shortDescription: Yup.string().required('Short description is required'),
    longDescription: Yup.string(),
    merchandiseCategory: Yup.string(),
    status: Yup.mixed().required().oneOf(["INACTIVE", "ACTIVE", "DISCONTINUED", "SEASONAL", "TO_DISCONTINUE", "UNAUTHORIZED"]),
    departmentId: Yup.string(),
    nonMerchandise: Yup.boolean()
  })

  const handleSubmit = async values => {
    let data = {};
    for (const key in values) {
      // Remove empty fields.
      if (values[key] !== "") {
        data[key] = values[key];
      }
    }

    delete data['itemId'];
    data['itemId'] = { 'itemCode': values['itemId'] };

    delete data['merchandiseCategory'];
    data['merchandiseCategory'] = { 'nodeId': values['merchandiseCategory'] };

    delete data['shortDescription'];
    data['shortDescription'] = {
      'values': [{
        "locale": "en-us",
        "value": values['shortDescription']
      }]
    };

    delete data['longDescription'];
    data['longDescription'] = {
      'values': [{
        "locale": "en-us",
        "value": values['longDescription']
      }]
    };

    data['version'] = 2;
    console.log(data);
    let body = { "items": [data] };

    fetch('/api/items', { method: 'POST', body: JSON.stringify(body) })
      .then(response => response.json())
      .then(data => {
        if (data.status == 204) {
          router.push('/admin/dashboard')
        }
      });

  }

  return (
    <Formik initialValues={initialValues} validationSchema={createItemSchema} onSubmit={handleSubmit}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="bg pb-4">
            <Header />
            <main className="container">
              <Form>
                <div className="form-group">
                  <label htmlFor="itemId">Item Id</label>
                  <Field name="itemId" id="itemId" className={`${errors.itemId && touched.itemId ? "is-invalid" : null} form-control`} />
                  <ErrorMessage
                    name="itemId"
                    component="div"
                    className="invalid-feedback"
                  />
                  <small id="itemId" className="form-text text-muted">
                    Will be used as the referenceId also.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="shortDescription">Short Description (Name)</label>
                  <Field name="shortDescription" id="shortDescription" className={`${errors.shortDescription && touched.shortDescription ? "is-invalid" : null} form-control`} />
                  <ErrorMessage
                    name="shortDescription"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="longDescription">Long Description</label>
                  <Field as="textarea" rows="2" name="longDescription" id="longDescription" className={`${errors.longDescription && touched.longDescription ? "is-invalid" : null} form-control`} />
                  <ErrorMessage
                    name="longDescription"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="merchandiseCategory">Merchandise Category</label>
                  <Field as="select" name="merchandiseCategory" className={`${errors.merchandiseCategory && touched.merchandiseCategory} ? "is-invalid" : null} form-control`}>
                    <option>--</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} label={category.title} />
                    ))}
                  </Field>
                  <ErrorMessage
                    name="parentCategory"
                    component="div"
                    className="invalid-feedback"
                  />
                  <small id="parentCategory" className="form-text text-muted">
                    Select the deepest category as the parent.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <Field as="select" name="status" className={`${errors.status && touched.status} ? "is-invalid" : null} form-control`}>
                    <option>--</option>
                    <option value="ACTIVE" label="Active" />
                    <option value="INACTIVE" label="Inactive" />
                    <option value="DISCONTINUED" label="Discontinue" />
                    <option value="SEASONAL" label="Seasonal" />
                    <option value="TO_DISCONTINUE" label="To Discontinue" />
                    <option value="UNAUTHORIZED" label="Unauthorized" />
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="invalid-feedback"
                  />
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
                <div className="form-group">
                  <button type="submit" className={`${!(dirty && isValid) ? "disabled" : ""} btn btn-primary`}>Create</button>
                </div>
              </Form>
            </main>
          </div >
        )
      }}
    </Formik>
  )
}

export default CatalogForm;