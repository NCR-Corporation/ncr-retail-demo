import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn, getSession, useSession } from 'next-auth/client';
// import Header from '~/components/public/Header';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Col,
  Button,
  CardFooter,
} from 'reactstrap';

const initialValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
};

const createConsumerSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  emailAddress: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function Register({ showLoginModal }) {
  const handleSubmit = async (values) => {
    const { emailAddress, firstName, lastName, password } = values;
    signIn('register', {
      emailAddress,
      firstName,
      lastName,
      password,
      disableCallback: true,
    }).then(async () => {
      let status = await getSession();
      console.log(status);
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createConsumerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Form>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle tag="h4">Sign Up</CardTitle>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="firstName">First Name*</label>
                          <Field
                            name="firstName"
                            id="firstName"
                            className={`${
                              errors.firstName && touched.firstName
                                ? 'is-invalid'
                                : null
                            } form-control`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name*</label>
                          <Field
                            name="lastName"
                            id="lastName"
                            className={`${
                              errors.lastName && touched.lastName
                                ? 'is-invalid'
                                : null
                            } form-control`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="emailAddress">Email*</label>
                          <Field
                            name="emailAddress"
                            id="emailAddress"
                            className={`${
                              errors.emailAddress && touched.emailAddress
                                ? 'is-invalid'
                                : null
                            } form-control`}
                          />
                          <ErrorMessage
                            name="emailAddress"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="password">Password*</label>
                          <Field
                            name="password"
                            type="password"
                            id="password"
                            className={`${
                              errors.password && touched.password
                                ? 'is-invalid'
                                : null
                            } form-control`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          block
                          color="primary"
                          type="submit"
                          className={`${!(dirty && isValid) ? 'disabled' : ''}`}
                          disabled={!(dirty && isValid)}
                        >
                          Sign Up
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="bg">
                    <p className="text-muted mb-0">
                      Already have an account?{' '}
                      <Button
                        color="link"
                        className="p-0 b-0"
                        onClick={showLoginModal}
                      >
                        Login
                      </Button>
                    </p>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
    // <form method="post" action="/api/auth/signin/email">
    //   <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //   <label>
    //     Email address
    //     <input type="text" id="email" name="email" />
    //   </label>
    //   <button type="submit">Sign in with Email</button>
    // </form>
  );
}

Register.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
