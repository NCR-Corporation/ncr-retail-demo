import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import DatePicker from '../DatePicker';
import 'react-datepicker/dist/react-datepicker.css';

const createItemSchema = Yup.object().shape({
  shortDescription: Yup.string().required('Short description is required'),
  longDescription: Yup.string(),
  status: Yup.mixed().required('Status is required').oneOf(['INACTIVE', 'ACTIVE', 'DISCONTINUED', 'SEASONAL', 'TO_DISCONTINUE', 'UNAUTHORIZED']),
  price: Yup.number().when('version', {
    is: (val) => val === 1,
    then: Yup.number().test('is-decimal', 'Input Valid Price', (value) => (value + '').match(/^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$/))
  }),
  currency: Yup.mixed().required().oneOf(['USD']),
  version: Yup.number().required('Version is required when updating category.'),
  groups: Yup.string()
});

const SiteCatalogItemForm = ({ toggle, itemObject, siteId, setShowAlert }) => {
  const { item, itemAttributes, itemPrices } = itemObject;
  const initialValues = {
    shortDescription: itemAttributes ? itemAttributes.shortDescription.values[0].value : item.shortDescription.values[0].value,
    longDescription: itemAttributes
      ? itemAttributes.longDescription && itemAttributes.longDescription.values.length > 0
        ? itemAttributes.longDescription.values[0].value
        : ''
      : item.longDescription.values[0].value,
    status: itemAttributes ? itemAttributes.status : item.status,
    price: itemPrices.length > 0 ? itemPrices[0].price : '',
    currency: itemPrices.length > 0 ? itemPrices[0].currency : '',
    effectiveDate: itemPrices.length > 0 ? itemPrices[0].effectiveDate : '',
    imageUrl: itemAttributes ? itemAttributes.imageUrls[0] : '',
    version: itemAttributes
      ? itemPrices.length > 0
        ? itemAttributes.version > itemPrices[0].version
          ? itemAttributes.version + 1
          : itemPrices[0].version + 1
        : itemAttributes.version
      : item.version,
    priceId: itemPrices.length > 0 ? itemPrices[0].priceId.priceCode : '',
    groups: itemAttributes && itemAttributes.groups.length > 0 ? itemAttributes.groups[0].groupCode : ''
  };

  const handleSubmit = async (values) => {
    fetch(`/api/sites/catalog/${siteId}/${item.itemId.itemCode}`, {
      method: 'POST',
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then((data) => {
        let message = 'Item successfully updated';
        let status = 204;
        if (data.updatePrice.status != 204) {
          message = data.updatePrice.data.message;
          status = data.updatePrice.status;
        } else if (data.updateAttributes.status != 204) {
          message = data.updateAttributes.data.message;
          status = data.updateAttributes.status;
        }
        setShowAlert({ status, message });
      });
  };

  return (
    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={createItemSchema} onSubmit={handleSubmit}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Form>
            <ModalHeader>{item.shortDescription.values[0].value}</ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="version">Version</label>
                      <Field name="version" id="version" className={`${errors.version && touched.version ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="version" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="status">Status*</label>
                      <Field as="select" name="status" className={`${errors.status && touched.status ? 'is-invalid' : null} form-control`}>
                        <option>--</option>
                        <option value="ACTIVE" label="Active" />
                        <option value="INACTIVE" label="Inactive" />
                        <option value="DISCONTINUED" label="Discontinue" />
                        <option value="SEASONAL" label="Seasonal" />
                        <option value="TO_DISCONTINUE" label="To Discontinue" />
                        <option value="UNAUTHORIZED" label="Unauthorized" />
                      </Field>
                      <ErrorMessage name="status" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="shortDescription">Title*</label>
                    <Field
                      name="shortDescription"
                      id="shortDescription"
                      placeholder="Item Name"
                      className={`${errors.shortDescription && touched.shortDescription ? 'is-invalid' : null} form-control`}
                    />
                    <ErrorMessage name="shortDescription" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="longDescription">Long Description</label>
                    <Field as="textarea" rows="4" name="longDescription" id="longDescription" className={`${errors.longDescription && touched.longDescription ? 'is-invalid' : null} form-control`} />
                    <ErrorMessage name="longDescription" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="imageUrl">Image Url</label>
                    <Field name="imageUrl" id="imageUrl" placeholder="https://..." className={`${errors.imageUrl && touched.imageUrl ? 'is-invalid' : null} form-control`} />
                    <ErrorMessage name="imageUrl" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="groups">Group</label>
                    <Field name="groups" id="groups" className={`${errors.groups && touched.groups ? 'is-invalid' : null} form-control`} />
                    <ErrorMessage name="groups" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="price">Price</label>
                      <Field name="price" id="price" className={`${errors.price && touched.price ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="price" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <Field as="select" name="currency" className={`${errors.currency && touched.currency ? 'is-invalid' : null} form-control`}>
                        <option>--</option>
                        <option value="USD">USD</option>
                      </Field>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="effectiveDate">Effective Date</label>
                      <DatePicker name="effectiveDate" />
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="justify-content-between">
              <Button color="secondary" onClick={() => toggle(null)}>
                Cancel
              </Button>
              <button type="submit" className={`${!(dirty && isValid) ? 'disabled' : ''} btn btn-primary`} disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}>
                Update Item
              </button>
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SiteCatalogItemForm;
