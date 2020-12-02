import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getSession, signIn, useSession } from 'next-auth/client';
// import Header from '~/components/public/Header';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Col,
  Button,
  CardFooter,
  Alert,
} from 'reactstrap';

const initialValues = {
  emailAddress: '',
  password: '',
};

const createConsumerSchema = Yup.object().shape({
  emailAddress: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function Login({ toggle, showRegisterModal }) {
  const router = useRouter();
  const [session] = useSession();
  const [loginErrors, useErrors] = useState(false);

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const handleSubmit = async (values) => {
    console.log(values);
    signIn('login', {
      json: true,
      emailAddress: values.emailAddress,
      password: values.password,
      disableCallback: true,
    }).then(async () => {
      let status = await getSession();
      if (status == null) {
        useErrors(true);
      } else {
        // If a modal
        if (toggle) {
          toggle();
        } else {
          router.push({
            pathname: '/',
          });
        }
      }
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
                    {loginErrors && (
                      <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                        Invalid login.
                      </Alert>
                    )}
                    <CardTitle tag="h4">Login</CardTitle>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="emailAddress">Email*</label>
                          <Field
                            name="emailAddress"
                            id="emailAddress"
                            value="email@email.com"
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
                            value="pass"
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
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="bg">
                    <p className="text-muted mb-0">
                      Need have an account?{' '}
                      <Button
                        color="link"
                        className="p-0 m-0"
                        onClick={showRegisterModal}
                      >
                        Register
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
  );
}
