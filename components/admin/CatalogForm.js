import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/admin/Header';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CategorySelect from './CategorySelect';
import useCatalogItem from '../../context/useCatalogItem';
import { Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import DatePicker from './DatePicker';
import "react-datepicker/dist/react-datepicker.css";

const init = {
  itemId: '',
  shortDescription: '',
  longDescription: '',
  merchandiseCategory: '',
  status: '',
  departmentId: 'NA',
  nonMerchandise: false,
  price: '',
  currency: "USD",
  effectiveDate: '',
  endDate: '',
  imageUrl: '',
  version: 1
}

const createItemSchema = Yup.object().shape({
  itemId: Yup.string().required('Item id is required'),
  shortDescription: Yup.string().required('Short description is required'),
  longDescription: Yup.string(),
  // Need to update this required check to handle hidden field on change
  merchandiseCategory: Yup.string().required(),
  status: Yup.mixed().required().oneOf(["INACTIVE", "ACTIVE", "DISCONTINUED", "SEASONAL", "TO_DISCONTINUE", "UNAUTHORIZED"]),
  departmentId: Yup.string(),
  nonMerchandise: Yup.boolean(),
  price: Yup.number().when("version", {
    is: (val => val === 1),
    then: Yup.number().test(
      'is-decimal',
      'Input Valid Price',
      value => (value + "").match(/^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$/),
    )
  }),
  version: Yup.number().required()
})

const CatalogForm = ({ id, categories }) => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false)

  let { catalogItem, isLoading, isError } = useCatalogItem(id);
  const [initialValues, setInitialValues] = useState(init);
  if (id && !isLoading && !isError && initialValues.itemId == '') {
    const { departmentId, alternateCategories, itemId, longDescription, merchandiseCategory, nonMerchandise, referenceId, shortDescription, status, version } = catalogItem;
    let catalogValues = {
      version: version + 1,
      departmentId,
      itemId: itemId.itemCode,
      longDescription: longDescription ? longDescription.values[0].value : '',
      shortDescription: shortDescription ? shortDescription.values[0].value : '',
      merchandiseCategory: merchandiseCategory.nodeId,
      nonMerchandise: nonMerchandise ?? false,
      status
    };
    setInitialValues(catalogValues);
  }

  const [parentCategory, setParentCategory] = useState();



  const handleSubmit = async values => {
    let data = {};
    for (const key in values) {
      // Remove empty fields.
      if (values[key] !== "") {
        data[key] = values[key];
      }
      if (key === "version") {
        data['version'] = values[key];
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

    // data['version'] = 2;
    // data['merchandiseCategory'] = { "nodeId": parentCategory };



    if (id) {
      // delete data['itemId'];
      fetch(`/api/items/${id}`, { method: 'POST', body: JSON.stringify(data) })
        .then(response => response.json())
        .then(data => {
          if (data.status != 204) {
            setShowAlert({ status: data.status, message: data.data.message })
          } else {
            setShowAlert({ status: 200, message: 'Item successfully updated.' })
          }
          setVisible(true);
        });
    } else {
      fetch('/api/items', { method: 'POST', body: JSON.stringify(data) })
        .then(response => response.json())
        .then(data => {
          if (data.status != 204) {
            setShowAlert({ status: data.status, message: data.data.message })
          } else {
            setShowAlert({ status: 200, message: 'Item successfully updated.' })
          }
          setVisible(true);
        });
    }
  }

  return (
    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={createItemSchema} onSubmit={handleSubmit}>
      {(formik) => {
        const { errors, touched, isValid, dirty, setFieldTouched, setFieldValue } = formik;
        useEffect(() => {
          initialValues.merchandiseCategory = parentCategory;
          setFieldValue('merchandiseCategory', parentCategory);
          setFieldTouched('merchandiseCategory', true)
        }, [parentCategory])
        return (
          <div className="bg pb-4">
            <Header />
            <main className="container pt-4">
              <Form>
                {isLoading && (<div className="mt-4 d-flex justify-content-center"><Spinner color="primary" /></div>)}
                <Alert toggle={onDismiss} isOpen={visible} className="mt-4" color={showAlert.status == 200 ? 'success' : 'danger'}>{showAlert.message}</Alert>
                <Row>
                  <Col>
                    <h4 className="mb-2">{id ? 'Edit' : 'Create'} Item</h4>
                  </Col>
                  <Col>
                    <div className="form-group float-right">
                      <button type="submit" className={`${!(dirty && isValid) ? "disabled" : ""} btn btn-primary`} disabled={`${!(dirty && isValid) ? "disabled" : ""}`}>+ {id ? 'Update' : 'Create'} Item</button>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md='8'>
                    <Card className="mb-3">
                      <CardBody>
                        <div className="form-group">
                          <label htmlFor="shortDescription">Title*</label>
                          <Field name="shortDescription" id="shortDescription" placeholder='Item Name' className={`${errors.shortDescription && touched.shortDescription ? "is-invalid" : null} form-control`} />
                          <ErrorMessage
                            name="shortDescription"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="longDescription">Long Description</label>
                          <Field as="textarea" rows="4" name="longDescription" id="longDescription" className={`${errors.longDescription && touched.longDescription ? "is-invalid" : null} form-control`} />
                          <ErrorMessage
                            name="longDescription"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="mb-3">
                      <CardBody>
                        <div className="form-group">
                          <label htmlFor="imageUrl">Image Url</label>
                          <Field name="imageUrl" id="imageUrl" placeholder='https://...' className={`${errors.imageUrl && touched.imageUrl ? "is-invalid" : null} form-control`} disabled={id ? 'disabled' : ''} />
                          <ErrorMessage
                            name="imageUrl"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                      </CardBody>
                    </Card>
                    <Card className="mb-3">
                      <CardBody>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="itemId">Item Id*</label>
                            <Field name="itemId" id="itemId" className={`${errors.itemId && touched.itemId ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="itemId"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <div className="form-group">
                              <label htmlFor="referenceId">referenceId</label>
                              <input type="text" className="form-control" id="referenceId" placeholder="TBD" disabled />
                            </div>
                          </div>

                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="manufacturerCode">manufacturerCode</label>
                            <input type="text" className="form-control" id="manufacturerCode" placeholder="TBD" disabled />
                          </div>
                          <div className="form-group col-md-6">
                            <div className="form-group">
                              <label htmlFor="posNumber">posNumber</label>
                              <input type="text" className="form-control" id="posNumber" placeholder="TBD" disabled />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="packageIdentifier">Package Identifier</label>
                          <input type="text" className="form-control" id="packageIdentifier" placeholder="TBD" disabled />
                        </div>
                        <div className="form-group">
                          <label htmlFor="externalIdentifiers">externalIdentifiers</label>
                          <input type="text" className="form-control" id="externalIdentifiers" placeholder="TBD" disabled />
                        </div>

                      </CardBody>
                    </Card>
                    <Card className="mb-3">
                      {!id ? (
                        <CardBody>
                          <div className="form-row">
                            <div className="form-group col-md-4">
                              <label htmlFor="price">Price</label>
                              <Field name="price" id="price" className={`${errors.price && touched.price ? "is-invalid" : null} form-control`} />
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="currency">Currency</label>
                              <Field as="select" name="currency" className={`${errors.currency && touched.currency ? "is-invalid" : null} form-control`}>
                                <option value="USD">USD</option>
                              </Field>
                            </div>

                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-4">
                              <label htmlFor="effectiveDate">Effective Date</label>
                              <DatePicker name="effectiveDate" />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="endDate">End Date</label>
                              <DatePicker name="endDate" />
                            </div>
                          </div>
                        </CardBody>
                      ) : (
                          <CardBody>
                            Price cannot be updated on a global level after creation. Prices are updated on each individual site.
                          </CardBody>
                        )}
                    </Card>
                    <Card>
                      <CardBody>
                        <div className="form-group">
                          <label htmlFor="dynamicAttributes">dynamicAttributes</label>
                          <input type="text" className="form-control" id="dynamicAttributes" placeholder="TBD" disabled />
                        </div>

                      </CardBody>
                    </Card>
                  </Col>
                  <Col md='4'>
                    <Card className="mb-3">
                      <CardBody>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="version">Version</label>
                            <Field name="version" id="version" className={`${errors.version && touched.version ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="version"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status*</label>
                          <Field as="select" name="status" className={`${errors.status && touched.status ? "is-invalid" : null} form-control`}>
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
                          <label htmlFor="nonMerchandise">nonMerchandise</label>
                          <input type="text" className="form-control" id="nonMerchandise" placeholder="TBD" disabled required />
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="mb-3">
                      <CardBody>
                        <Field name="merchandiseCategory" id="merchandiseCategory" className="d-none" value={parentCategory || ''} />
                        <CategorySelect currentCategory={initialValues.merchandiseCategory} initialCategory={initialValues.parentCategory ?? ''} setDisabled={initialValues.merchandiseCategory ? true : false} setParentCategory={setParentCategory} categories={categories} />
                        <div className="form-group">
                          <label htmlFor="alternateCategories">Alternate Categories</label>
                          <input type="text" className="form-control" id="alternateCategories" placeholder="TBD" disabled />
                        </div>
                        <div className="form-group">
                          <label htmlFor="departmentId">Department Id</label>
                          <input type="text" className="form-control" id="departmentId" placeholder="TBD" disabled required />
                        </div>

                        <div className="form-group">
                          <label htmlFor="familyCode">familyCode</label>
                          <input type="text" className="form-control" id="familyCode" placeholder="TBD" disabled />
                        </div>
                        {/* <FormGroup check>
                          <Label check>
                            <Input type="checkbox" />{' '}
                            Apply to All Stores
                          </Label>
                        </FormGroup> */}

                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </main>
          </div >
        )
      }}
    </Formik>
  )
}

export default CatalogForm;