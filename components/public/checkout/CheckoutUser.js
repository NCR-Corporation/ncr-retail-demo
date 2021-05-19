import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Row, Col, CardTitle, CardBody, Button } from 'reactstrap';
import { useState } from 'react';

const createUserSchema = Yup.object().shape({
  street: Yup.string().max(256, 'Maximum of 256 characters'),
  city: Yup.string()
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
    .max(128, 'Maximum of 128 characters')
    .when('street', {
      is: (street) => street && street.length > 0,
      then: Yup.string().required('State is required')
    })
});

export default function CheckoutUser({ order, setOrder }) {
  // const { user, isLoading, isError } = useUser(session);
  const [shipmentConfirmed, setShipmentConfirmed] = useState(false);

  let address = {};
  const initialValues = {
    street: address.street ? address.street : '',
    city: address.city ? address.city : '',
    state: address.state ? address.state : '',
    postalCode: address.postalCode ? address.postalCode : '',
    country: address.country ? address.country : ''
  };

  const handleSubmit = async (values) => {
    setOrder({ ...order, shipping: values });
    setShipmentConfirmed(true);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={createUserSchema} onSubmit={handleSubmit}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Form>
            <Card className="mb-2 cart-card">
              <CardBody>
                <CardTitle tag="h5">Shipping</CardTitle>
                <Row>
                  <Col sm="12">
                    <div className="form-group">
                      <label htmlFor="street">Street</label>
                      <Field name="street" id="street" className={`${errors.street && touched.street ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="street" component="div" className="invalid-feedback" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="4">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <Field name="city" id="city" className={`${errors.city && touched.city ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="city" component="div" className="invalid-feedback" />
                    </div>
                  </Col>
                  <Col sm="2">
                    <div className="form-group ">
                      <label htmlFor="state">State</label>
                      <Field name="state" id="state" className={`${errors.state && touched.state ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="state" component="div" className="invalid-feedback" />
                    </div>
                  </Col>
                  <Col sm="3">
                    <div className="form-group ">
                      <label htmlFor="postalCode">Postal Code</label>
                      <Field name="postalCode" id="postalCode" className={`${errors.postalCode && touched.postalCode ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="postalCode" component="div" className="invalid-feedback" />
                    </div>
                  </Col>
                  <Col sm="3">
                    <div className="form-group ">
                      <label htmlFor="country">Country</label>
                      <Field name="country" id="country" className={`${errors.country && touched.country ? 'is-invalid' : null} form-control`} />
                      <ErrorMessage name="country" component="div" className="invalid-feedback" />
                    </div>
                  </Col>
                </Row>
                <Button
                  color={`${shipmentConfirmed ? 'success' : 'primary'}`}
                  type="submit"
                  className={`${!(dirty && isValid) ? 'disabled' : ''} float-right`}
                  disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}
                >
                  {shipmentConfirmed ? <FontAwesomeIcon icon={faCheckCircle} size="lg" /> : '+'} Set Shipping Address
                </Button>
              </CardBody>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}
