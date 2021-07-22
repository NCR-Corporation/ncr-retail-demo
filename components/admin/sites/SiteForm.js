import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import useSite from '~/lib/swr/useSite';
import { useState } from 'react';

const createSiteSchema = Yup.object().shape({
  siteName: Yup.string().required('Site Name is required').min(1, 'Minimum of 1 character').max(200, 'Maximum of 200 characters'), // Regex?
  contactPerson: Yup.string().max(512, 'Maximum of 512 characters'),
  contactPhoneNumber: Yup.string()
    .max(32, 'Maximum of 32 characters')
    .when('contactPerson', {
      is: (contactPerson) => contactPerson && contactPerson.length > 0,
      then: Yup.string().required('Phone Number is required')
    }),
  contactPhoneNumberCountryCode: Yup.string()
    .max(3, 'Maximum of 3 characters')
    .when('contactPerson', {
      is: (contactPerson) => contactPerson && contactPerson.length > 0,
      then: Yup.string().required('Phone Number Country Code is required')
    }), // Regex
  timezone: Yup.string(),
  description: Yup.string().max(512, 'Maximum of 512 characters').min(1, 'Minimum of 1 character'), //Regex
  currency: Yup.string().matches(/^[A-Z]{3}$/, 'Matches 3 characters, A-Z. Example, USD'),
  street: Yup.string().required('Street is required.').max(256, 'Maximum of 256 characters'),
  city: Yup.string()
    .required('City is required.')
    .max(128, 'Maximum of 128 characters')
    .when('street', {
      is: (street) => street && street.length > 0,
      then: Yup.string().required('City is required')
    }),
  country: Yup.string()
    .max(128, 'Maximum of 128 characters')
    .when('street', {
      is: (street) => street && street.length > 0,
      then: Yup.string().required('Country is required')
    }),
  postalCode: Yup.string()
    .max(64, 'Maximum of 64 characters')
    .when('street', {
      is: (street) => street && street.length > 0,
      then: Yup.string().required('Postal Code is required')
    }),
  state: Yup.string()
    .required('State is required.')
    .max(128, 'Maximum of 128 characters')
    .when('street', {
      is: (street) => street && street.length > 0,
      then: Yup.string().required('State is required')
    }),
  latitude: Yup.number().required('Latitude is required').moreThan(-180).lessThan(180),
  longitude: Yup.number().required('Longitude is required').moreThan(-90).lessThan(90),
  status: Yup.mixed().required('Status is required').oneOf(['ACTIVE', 'INACTIVE']),
  referenceId: Yup.string().max(100).min(1)
});

let init = {
  siteName: '',
  contactPerson: '',
  contactPhoneNumberCountryCode: '',
  contactPhoneNumber: '',
  timezone: '',
  description: '',
  currency: '',
  street: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  latitude: '',
  longitude: '',
  status: '',
  referenceId: ''
};

const New = ({ siteId }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);
  let { site, isLoading, isError } = useSite(siteId);
  const [initialValues, setInitialValues] = useState(init);
  if (!isLoading && !isError && siteId && initialValues.siteName == '') {
    const { response } = site;
    const { data } = response;
    const { coordinates, currency, description, enterpriseUnitName, id, referenceId, siteName, status, contact, timezone, address } = data;
    let siteValues = {
      siteName,
      contactPerson: contact ? contact.contactPerson : '',
      contactPhoneNumberCountryCode: contact ? contact.phoneNumberCountryCode : '',
      contactPhoneNumber: contact ? contact.phoneNumber : '',
      timezone: timezone ?? '',
      status,
      referenceId,
      id,
      enterpriseUnitName,
      description: description ?? '',
      currency: currency ?? '',
      street: address ? address.street : '',
      state: address ? address.state : '',
      city: address ? address.city : '',
      country: address ? address.country : '',
      postalCode: address ? address.postalCode : '',
      latitude: coordinates ? coordinates.latitude : '',
      longitude: coordinates ? coordinates.longitude : ''
    };
    setInitialValues(siteValues);
  }

  const handleSumbit = async (values) => {
    let data = {};
    for (const key in values) {
      // Remove empty fields.
      if (values[key] !== '') {
        data[key] = values[key];
      }
    }
    if (data['street']) {
      data['address'] = {
        city: data['city'],
        postalCode: data['postalCode'],
        state: data['state'],
        street: data['street'],
        country: data['country']
      };
      ['city', 'postalCode', 'state', 'street', 'country'].forEach((e) => delete data[e]);
    }
    if (data['contactPerson']) {
      data['contact'] = {
        contactPerson: data['contactPerson'],
        phoneNumber: data['contactPhoneNumber'],
        phoneNumberCountryCode: data['contactPhoneNumberCountryCode']
      };
      ['contactPerson', 'phoneNumber', 'phoneNumberCountryCode'].forEach((e) => delete data[e]);
    }
    data['coordinates'] = {
      latitude: data['latitude'],
      longitude: data['longitude']
    };
    delete data['latitude'];
    delete data['longitude'];
    data['enterpriseUnitName'] = data['siteName'];

    if (siteId) {
      fetch(`/api/sites/${siteId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          const { response } = data;
          if (response.status != 200) {
            setShowAlert({
              status: response.status,
              message: response.data.message
            });
          } else {
            setShowAlert({
              status: response.status,
              message: 'Site successfully updated'
            });
          }
          setVisible(true);
        });
    } else {
      fetch('/api/sites', { method: 'POST', body: JSON.stringify(data) })
        .then((response) => response.json())
        .then((data) => {
          const { response } = data;
          if (response.status != 200) {
            setShowAlert({
              status: response.status,
              message: JSON.stringify(response)
            });
          } else {
            setShowAlert({
              status: response.status,
              message: 'Site successfully created'
            });
          }
          setVisible(true);
        });
    }
  };

  return (
    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={createSiteSchema} onSubmit={handleSumbit}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <main className="my-4">
            {isLoading && (
              <div className="d-flex justify-content-center">
                <Spinner color="primary" />
              </div>
            )}
            {!isLoading && (
              <Form>
                <Alert toggle={onDismiss} isOpen={visible} className="my-4" color={showAlert.status == 200 ? 'success' : 'danger'}>
                  {showAlert.message}
                </Alert>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">{siteId ? 'Edit' : 'Create'} Site</h1>
                  <div className="form-group float-right">
                    <button type="submit" className={`${!(dirty && isValid) ? 'disabled' : ''} btn btn-primary`} disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}>
                      {' '}
                      {siteId ? '+ Update' : '+ Create'} Site
                    </button>
                  </div>
                </div>
                <Row>
                  <Col md="8">
                    <Card className="mb-2">
                      <CardBody>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="referenceId">Reference Id</label>
                            <Field name="referenceId" id="referenceId" className={`${errors.referenceId && touched.referenceId ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="referenceId" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="siteName">Site Name</label>
                          <Field type="text" name="siteName" id="siteName" className={`${errors.siteName && touched.siteName ? 'is-invalid' : null} form-control`} />
                          <ErrorMessage name="siteName" component="div" className="invalid-feedback" />
                          <small className="form-text text-muted">Also Enterprise Unit Name</small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <Field as="textarea" rows="2" name="description" id="description" className={`${errors.description && touched.description ? 'is-invalid' : null} form-control`} />
                          <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="mb-2">
                      <CardBody>
                        <div className="form-group">
                          <label htmlFor="street">Street</label>
                          <Field name="street" id="street" className={`${errors.street && touched.street ? 'is-invalid' : null} form-control`} />
                          <ErrorMessage name="street" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="city">City</label>
                            <Field name="city" id="city" className={`${errors.city && touched.city ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="city" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group col-md-2">
                            <label htmlFor="state">State</label>
                            <Field name="state" id="state" className={`${errors.state && touched.state ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="state" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="postalCode">Postal Code</label>
                            <Field name="postalCode" id="postalCode" className={`${errors.postalCode && touched.postalCode ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="postalCode" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="country">Country</label>
                            <Field name="country" id="country" className={`${errors.country && touched.country ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="country" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="latitude">Latitude</label>
                            <Field name="latitude" id="latitude" className={`${errors.latitude && touched.latitude ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="latitude" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="longitude">Longitude</label>
                            <Field name="longitude" id="longitude" className={`${errors.longitude && touched.longitude ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="longitude" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="timezone">Time Zone</label>
                            <Field type="text" name="timezone" id="timezone" className={`${errors.timezone && touched.timezone ? 'is-invalid' : null} form-control`} placeholder="US/Eastern" />
                            <ErrorMessage name="timezone" component="div" className="invalid-feedback" />
                            <small id="timezone" className="form-text text-muted">
                              Time zone for site in IANA format [https://www.iana.org/time-zones]
                            </small>
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
                            <Field type="text" name="contactPerson" id="contactPerson" className={`${errors.contactPerson && touched.contactPerson ? 'is-invalid' : null} form-control`} />
                            <ErrorMessage name="contactPerson" component="div" className="invalid-feedback" />
                            <small id="itemId" className="form-text text-muted">
                              Contact Person Name
                            </small>
                          </div>
                          <div className="form-group col-sm-2">
                            <label htmlFor="contactPhoneNumberCountryCode">Country Code</label>
                            <Field
                              type="text"
                              name="contactPhoneNumberCountryCode"
                              id="contactPhoneNumberCountryCode"
                              className={`${errors.contactPhoneNumberCountryCode && touched.contactPhoneNumberCountryCode ? 'is-invalid' : null} form-control`}
                            />
                            <ErrorMessage name="contactPhoneNumberCountryCode" component="div" className="invalid-feedback" />
                          </div>
                          <div className="form-group col">
                            <label htmlFor="contactPhoneNumber">Phone Number</label>
                            <Field
                              type="text"
                              name="contactPhoneNumber"
                              id="contactPhoneNumber"
                              className={`${errors.contactPhoneNumber && touched.contactPhoneNumber ? 'is-invalid' : null} form-control`}
                            />
                            <ErrorMessage name="contactPhoneNumber" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card>
                      <CardBody>
                        <div className="form-row">
                          <div className="form-group col-sm-6">
                            <label htmlFor="currency">Currency</label>
                            <Field as="select" name="currency" className={`${errors.currency && touched.currency ? 'is-invalid' : null} form-control`}>
                              <option value="USD">USD</option>
                            </Field>
                            <ErrorMessage name="currency" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <Field as="select" name="status" className={`${errors.status && touched.status ? 'is-invalid' : null} form-control`}>
                            <option>--</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </Field>
                          <ErrorMessage name="status" component="div" className="invalid-feedback" />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            )}
          </main>
        );
      }}
    </Formik>
  );
};

export default New;
