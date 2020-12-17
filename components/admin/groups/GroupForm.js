import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Row, Col, Spinner, Card, CardBody } from 'reactstrap';
import generateGUID from '~/lib/generateGUID';
import useGroup from '~/lib/hooks/useGroup';

const init = {
  version: 1,
  tag: '',
  status: '',
  title: '',
  groupId: '',
};

const createGroupSchema = Yup.object().shape({
  version: Yup.number().required('Version is required when udpating a group'),
  tag: Yup.string(),
  status: Yup.mixed()
    .required('Status is required')
    .oneOf([
      'INACTIVE',
      'ACTIVE',
      'DISCONTINUED',
      'SEASONAL',
      'TO_DISCONTINUE',
      'UNAUTHORIZED',
    ]),
  title: Yup.string().required('Title is required'),
  groupId: Yup.string().required('Group id is required'),
});

const GroupForm = ({ id }) => {
  const [initialValues, setInitialValues] = useState(init);
  let { group, isLoading, isError } = useGroup(id);
  if (id && !isLoading && !isError && initialValues.title == '') {
    console.log('the group', group);
    let { data } = group;
    let newValues = {
      version: data.version + 1,
      title: data.title.values[0].value,
      status: data.status,
      groupId: data.groupId.groupCode,
      tag: data.tag,
    };
    setInitialValues(newValues);
  }

  const handleSubmit = async (values) => {
    // update
    let data = {};
    for (const key in values) {
      // Remove empty fields.
      if (values[key] !== '') {
        data[key] = values[key];
      }
    }
    let groupId = data['groupId'];
    data['groupId'] = {
      groupCode: groupId,
    };
    let title = data['title'];
    // Doesn't support multi-lang right now.
    data['title'] = {
      values: [
        {
          locale: 'en-US',
          value: title,
        },
      ],
    };
    fetch(`/api/groups`, { method: 'POST', body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((data) => console.log('the', data));
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={createGroupSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty, setFieldValue } = formik;
        return (
          <Form>
            <Row className="mt-4">
              <Col>
                <h4 className="mb-1">{id ? 'Edit' : 'Create'} Group</h4>
              </Col>
              <Col>
                <div className="form-group float-right">
                  <button
                    type="submit"
                    className={`${
                      !(dirty && isValid) ? 'disabled' : ''
                    } btn btn-primary`}
                    disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}
                  >
                    {' '}
                    {id ? '+ Update' : '+ Create'} Group
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <Card>
                  <CardBody>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="title">Title*</label>
                        <Field
                          name="title"
                          id="title"
                          className={`${
                            errors.title && touched.title ? 'is-invalid' : null
                          } form-control`}
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="groupId">Group Id</label>
                      <Field
                        name="groupId"
                        id="groupId"
                        className={`${
                          errors.groupId && touched.groupId
                            ? 'is-invalid'
                            : null
                        } form-control`}
                        disabled={id ? 'disabled' : ''}
                      />
                      <ErrorMessage
                        name="groupId"
                        component="div"
                        className="invalid-feedback"
                      />
                      <Button
                        onClick={() => setFieldValue('groupId', generateGUID())}
                        color="link"
                        className="m-0 p-0"
                      >
                        Generate
                      </Button>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tag">Tag</label>
                      <Field
                        name="tag"
                        id="tag"
                        className={`${
                          errors.tag && touched.tag ? 'is-invalid' : null
                        } form-control`}
                      />
                      <ErrorMessage
                        name="tag"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="version">Version</label>
                      <Field
                        name="version"
                        id="version"
                        className={`${
                          errors.version && touched.version
                            ? 'is-invalid'
                            : null
                        } form-control`}
                      />
                      <ErrorMessage
                        name="version"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <Field
                        as="select"
                        name="status"
                        className={`${
                          errors.status && touched.status ? 'is-invalid' : null
                        } form-control`}
                      >
                        <option value="" label="--" />
                        <option value="ACTIVE" label="ACTIVE" />
                        <option value="INACTIVE" label="INACTIVE" />
                        <option value="DISCONTINUED" label="DISCONTINUED" />
                        <option value="SEASONAL" label="SEASONAL" />
                        <option value="TO_DISCONTINUE" label="TO_DISCONTINUE" />
                        <option value="UNAUTHORIZED" label="UNAUTHORIZED" />
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GroupForm;
