import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getSession, signIn, useSession } from 'next-auth/client';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Col,
  Button,
  Spinner,
  CardFooter,
  Alert,
} from 'reactstrap';

const initialValues = {
  username: '',
  password: '',
};

const createConsumerSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.'),
});

export default function Login({ toggle, showRegisterModal }) {
  const router = useRouter();
  const [loginRequest, setLoginRequest] = useState(false);
  const [loginErrors, useErrors] = useState(false);
  const [session, loading] = useSession();

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const handleSubmit = async (values) => {
    setLoginRequest(true);
    signIn('login', {
      json: true,
      username: values.username,
      password: values.password,
      disableCallback: true,
    }).then(async () => {
      let status = await getSession();
      setLoginRequest(false);
      if (status == null) {
        useErrors(true);
      } else {
        // If a modal
        if (toggle) {
          toggle();
          router.reload();
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
                          <label htmlFor="username">Username*</label>
                          <Field
                            name="username"
                            id="username"
                            className={`${
                              errors.username && touched.username
                                ? 'is-invalid'
                                : null
                            } form-control`}
                          />
                          <ErrorMessage
                            name="username"
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
                          {loginRequest ? (
                            <Spinner color="light" size="sm" />
                          ) : (
                            <span>Login</span>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="bg">
                    <p className="text-muted mb-0">
                      Need have an account?{' '}
                      {!showRegisterModal ? (
                        <Link href="/auth/register">
                          <a className="link p-0 m-0">Register</a>
                        </Link>
                      ) : (
                        <Button
                          color="link"
                          className="p-0 m-0"
                          onClick={showRegisterModal}
                        >
                          Register
                        </Button>
                      )}
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
