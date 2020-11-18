import Header from '../layouts/Header';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap';

const createSiteSchema = Yup.object().shape({
  siteName: Yup.string().required("Site Name is required").min(1, "Minimum of 1 character").max(200, "Maximum of 200 characters"), // Regex?
  contactPerson: Yup.string().max(512, "Maximum of 512 characters"),
  contactPhoneNumber: Yup.string().max(32, "Maximum of 32 characters"),
  contactPhoneNumberCountryCode: Yup.string().max(3, "Maximum of 3 characters"), // Regex
  timezone: Yup.string(),
  description: Yup.string().max(512, "Maximum of 512 characters").min(1, "Minimum of 1 character"), //Regex
  currency: Yup.string().matches(/^[A-Z]{3}$/, "Matches 3 characters, A-Z. Example, USD"),
  street: Yup.string().max(256, "Maximum of 256 characters"),
  city: Yup.string().max(128, "Maximum of 128 characters"),
  country: Yup.string().max(128, "Maximum of 128 characters"),
  postalCode: Yup.string().max(64, "Maximum of 64 characters"),
  state: Yup.string().max(128, "Maximum of 128 characters"),
  latitude: Yup.number().required().moreThan(-180).lessThan(180),
  longitude: Yup.number().required().moreThan(-90).lessThan(90),
  status: Yup.mixed().required().oneOf(['ACTIVE', 'INACTIVE']),
  parentEnterpriseUnitId: Yup.string(), // Validate against server?
  referenceId: Yup.string().max(100).min(1)
});

const initialValues = {
  siteName: "",
  contactPerson: "",
  contactPhoneNumberCountryCode: "",
  contactPhoneNumber: "",
  timezone: "",
  description: "",
  currency: "USD",
  street: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  latitude: "",
  longitude: "",
  status: "ACTIVE",
  parentEnterpriseUnitId: "",
  referenceId: ""
};

const New = () => {

  const handleSumbit = async values => {
    let data = {};
    for (const key in values) {
      // Remove empty fields.
      if (values[key] !== "") {
        data[key] = values[key];
      }
      if (key === "siteName") {
        data['enterpriseUnitName'] = values[key];
      }
    }
    data['coordinates'] = {
      'latitude': data['latitude'],
      'longitude': data['longitude']
    };
    delete data['latitude'];
    delete data['longitude'];


    fetch('/api/sites', { method: 'POST', body: JSON.stringify(data) })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createSiteSchema}
      onSubmit={handleSumbit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="bg pb-4">
            <Header />
            <main className="container">
              <Form>
                <Row className="mt-4">
                  <Col md="8">
                    <Card className="mb-2">
                      <CardBody>
                        <CardTitle>
                          <h4 className="mb-4">Create Site</h4>
                        </CardTitle>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="referenceId">Reference Id</label>
                            <Field name="referenceId" id="referenceId" className={`${errors.referenceId && touched.referenceId ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="referenceId"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="siteName">Site Name</label>
                          <Field type="text" name="siteName" id="siteName" className={`${errors.siteName && touched.siteName ? "is-invalid" : null} form-control`} />
                          <ErrorMessage
                            name="siteName"
                            component="div"
                            className="invalid-feedback"
                          />
                          <small className="form-text text-muted">Also Enterprise Unit Name</small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <Field as="textarea" rows="2" name="description" id="description" className={`${errors.description && touched.description ? "is-invalid" : null} form-control`} />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                      </CardBody>
                    </Card>
                    <Card className="mb-2">
                      <CardBody>
                        <div className="form-group">
                          <label htmlFor="street">Street</label>
                          <Field name="street" id="street" className={`${errors.street && touched.street ? "is-invalid" : null} form-control`} />
                          <ErrorMessage
                            name="street"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="city">City</label>
                            <Field name="city" id="city" className={`${errors.city && touched.city ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label htmlFor="state">State</label>
                            <Field name="state" id="state" className={`${errors.state && touched.state ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="postalCode">Postal Code</label>
                            <ErrorMessage
                              name="postalCode"
                              component="div"
                              className="invalid-feedback"
                            />
                            <Field name="postalCode" id="postalCode" className={`${errors.postalCode && touched.postalCode ? "is-invalid" : null} form-control`} />
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="country">Country</label>
                            <Field name="country" id="country" className={`${errors.country && touched.country ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="latitude">Latitude</label>
                            <Field name="latitude" id="latitude" className={`${errors.latitude && touched.latitude ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="latitude"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="longitude">Longitude</label>
                            <Field name="longitude" id="longitude" className={`${errors.longitude && touched.longitude ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="longitude"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="timezone">Time Zone</label>
                            <Field type="text" name="timezone" id="timezone" className={`${errors.timezone && touched.timezone ? "is-invalid" : null} form-control`} placeholder="US/Eastern" />
                            <ErrorMessage
                              name="timezone"
                              component="div"
                              className="invalid-feedback"
                            />
                            <small id="timezone" className="form-text text-muted">Time zone for site in IANA format [https://www.iana.org/time-zones]</small>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="mb-2">
                      <CardBody>
                        <h5>Contact</h5>
                        <small className="form-text text-muted">Holds all contact information for site.</small>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="contactPerson">Contact Person</label>
                            <Field type="text" name="contactPerson" id="contactPerson" className={`${errors.contactPerson && touched.contactPerson ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="contactPerson"
                              component="div"
                              className="invalid-feedback"
                            />
                            <small id="itemId" className="form-text text-muted">
                              Contact Person Name
                      </small>
                          </div>
                          <div className="form-group col-sm-2">
                            <label htmlFor="contactPhoneNumberCountryCode">Country Code</label>
                            <Field type="text" name="contactPhoneNumberCountryCode" id="contactPhoneNumberCountryCode" className={`${errors.contactPhoneNumberCountryCode && touched.contactPhoneNumberCountryCode ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="contactPhoneNumberCountryCode"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col">
                            <label htmlFor="contactPhoneNumber">Phone Number</label>
                            <Field type="text" name="contactPhoneNumber" id="contactPhoneNumber" className={`${errors.contactPhoneNumber && touched.contactPhoneNumber ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="contactPhoneNumber"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>

                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card>
                      <CardBody>
                        <div className="form-row">
                          <div className="form-group col-sm-3">
                            <label htmlFor="currency">Currency</label>
                            <Field name="currency" id="currency" className={`${errors.currency && touched.currency ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="currency"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <Field as="select" name="status" className={`${errors.status && touched.status ? "is-invalid" : null} form-control`}>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        {/* <div className="form-group col-md-6"> */}
                        {/* <label htmlFor="enterpriseUnitName">Enterprise Unit Name</label>
                    <Field type="text" name="enterpriseUnitName" id="enterpriseUnitName" className={`${errors.enterpriseUnitName && touched.enterpriseUnitName ? "is-invalid" : null} form-control`} />
                    <small>I think this should be autopopulated</small>
                  </div> */}
                        <div className="form-group">
                          <label htmlFor="parentEnterpriseUnitId">Parent Enterprise Unit Id</label>
                          <Field name="parentEnterpriseUnitId" id="parentEnterpriseUnitId" className={`${errors.parentEnterpriseUnitId && touched.parentEnterpriseUnitId ? "is-invalid" : null} form-control`} />
                          <ErrorMessage
                            name="parentEnterpriseUnitId"
                            component="div"
                            className="invalid-feedback"
                          />
                          <small className="form-text text-muted" id="parentEnterpriseUnitId">Parent or organization enterprise unit ID for site</small>
                        </div>
                        <div className="form-group">
                          <button type="submit" className={`${!(dirty && isValid) ? "disabled" : ""} btn btn-primary`}>Create</button>
                        </div>

                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </main >
          </div >

        )
      }}
    </Formik >
  )
}

export default New;