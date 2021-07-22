import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import usePaymentInputs from 'react-payment-inputs/lib/usePaymentInputs';
import images from 'react-payment-inputs/images';
import * as Yup from 'yup';
import { Button, Card, Row, Col, CardTitle, CardBody } from 'reactstrap';
import { useState } from 'react';

const createUserSchema = Yup.object().shape({
  street: Yup.string()
    .max(256, 'Maximum of 256 characters')
    .when('sameAsShipping', {
      is: false,
      then: Yup.string().required('Street is required')
    }),
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
    }),
  sameAsShipping: Yup.boolean()
});

export default function CheckoutUser({ order, setOrder }) {
  const [tenderConfirmed, setTenderConfirmed] = useState(false);
  const { meta, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  let address = {};
  const initialValues = {
    street: address.street ? address.street : '',
    city: address.city ? address.city : '',
    state: address.state ? address.state : '',
    postalCode: address.postalCode ? address.postalCode : '',
    country: address.country ? address.country : '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    sameAsShipping: false
  };

  const handleSubmit = async (values) => {
    setOrder({ ...order, payment: values });
    setTenderConfirmed(true);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createUserSchema}
        onSubmit={handleSubmit}
        validate={() => {
          let errors = {};
          if (meta.erroredInputs.cardNumber) {
            errors.cardNumber = meta.erroredInputs.cardNumber;
          }
          if (meta.erroredInputs.expiryDate) {
            errors.expiryDate = meta.erroredInputs.expiryDate;
          }
          if (meta.erroredInputs.cvc) {
            errors.cvc = meta.erroredInputs.cvc;
          }
          return errors;
        }}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty } = formik;
          return (
            <Form>
              <Card className="mb-2 cart-card">
                <CardBody>
                  <CardTitle tag="h5">Payment</CardTitle>
                  <small>{`For demo purposes only. Use '4242 4242 4242 4242', '04/24', and '242' for testing purposes.`}</small>
                  <Row>
                    <Col sm="8">
                      <Row>
                        <Col sm="1">
                          <svg {...getCardImageProps({ images })} />
                        </Col>
                        <Col sm="11">
                          <Field name="cardNumber">
                            {({ field }) => (
                              <input
                                className="form-control "
                                {...getCardNumberProps({
                                  onBlur: field.onBlur,
                                  onChange: field.onChange
                                })}
                              />
                            )}
                          </Field>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="2">
                      <Field name="expiryDate">
                        {({ field }) => (
                          <input
                            className="form-control"
                            {...getExpiryDateProps({
                              onBlur: field.onBlur,
                              onChange: field.onChange
                            })}
                          />
                        )}
                      </Field>
                    </Col>
                    <Col sm="2">
                      <Field name="cvc">
                        {({ field }) => (
                          <input
                            className="form-control"
                            {...getCVCProps({
                              onBlur: field.onBlur,
                              onChange: field.onChange
                            })}
                          />
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col sm="6">
                      <h5>Billing Address</h5>
                    </Col>
                    <Col sm="6">
                      <Field type="checkbox" name="sameAsShipping" id="sameAsShipping" className={`${errors.sameAsShipping && touched.sameAsShipping ? 'is-invalid' : null} form-check-input`} />
                      <ErrorMessage name="sameAsShipping" component="div" className="invalid-feedback" />
                      <label className="form-check-label" htmlFor="sameAsShipping">
                        Same as Shipping
                      </label>
                    </Col>
                  </Row>
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
                    color={`${tenderConfirmed ? 'success' : 'primary'}`}
                    type="submit"
                    className={`${!(dirty && isValid) ? 'disabled' : ''} float-right`}
                    disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}
                  >
                    {tenderConfirmed ? <FontAwesomeIcon icon={faCheckCircle} size="lg" /> : '+'} Use Payment Method
                  </Button>
                </CardBody>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
