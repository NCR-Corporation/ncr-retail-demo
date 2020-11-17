import { useState } from 'react';
import Header from '../layouts/Header';
import { Formik, Form, Field, ErrorMessage } from "formik";
import CategorySelect from '../layouts/CategorySelect';
import * as Yup from "yup";

const New = ({ categories }) => {

  const [parentCategory, setParentCategory] = useState();

  const initialValues = {
    title: '',
    nodeCode: '',
    tag: '',
    departmentNode: false,
    departmentSale: false,
    status: 'ACTIVE',
    parentCategory: ''
  }

  const createCategorySchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    nodeCode: Yup.string().required('Node code is required'),
    tag: Yup.string(),
    departmentNode: Yup.boolean(),
    departmentSale: Yup.boolean(),
    status: Yup.mixed().required().oneOf(["INACTIVE", "ACTIVE", "DISCONTINUED", "SEASONAL", "TO_DISCONTINUE", "UNAUTHORIZED"]),
    parentCategory: Yup.string()

  })

  const handleSubmit = async values => {
    values["parentCategory"] = parentCategory;
    console.log(values);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={createCategorySchema} onSubmit={handleSubmit}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="bg pb-4">
            <Header />
            <main className="container">
              <Form>
                <div className="row">
                  <div className="col-md-8">
                    <div className="card mt-4">
                      <div className="card-body">
                        <h4 className="card-title mb-4">Create Category</h4>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="title">Title*</label>
                            <Field name="title" id="title" className={`${errors.title && touched.title ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="nodeCode">Node Code</label>
                            <Field name="nodeCode" id="nodeCode" className={`${errors.nodeCode && touched.nodeCode ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="nodeCode"
                              component="div"
                              className="invalid-feedback"
                            />
                            <small id="nodeCode" className="form-text text-muted">
                              This will be the same as the Node Id
                        </small>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="tag">Tag</label>
                            <Field name="tag" id="tag" className={`${errors.tag && touched.tag ? "is-invalid" : null} form-control`} />
                            <ErrorMessage
                              name="tag"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group form-check">
                              <Field type="checkbox" name="departmentNode" id="departmentNode" className={`${errors.departmentNode && touched.departmentNode ? "is-invalid" : null} form-check-input`} />
                              <ErrorMessage
                                name="departmentNode"
                                component="div"
                                className="invalid-feedback"
                              />
                              <label className="form-check-label" htmlFor="departmentNode">
                                Department Node
                          </label>
                              <small id="departmentNode" className="form-text text-muted">
                                Indicates if this node represents a department
                          </small>
                            </div>

                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <div className="form-check">
                                <Field type="checkbox" name="departmentSale" id="departmentSale" className={`${errors.departmentSale && touched.departmentSale ? "is-invalid" : null} form-check-input`} />
                                <ErrorMessage
                                  name="departmentNode"
                                  component="div"
                                  className="invalid-feedback"
                                />
                                <label className="form-check-label" htmlFor="departmentSale">
                                  Department Sale
                            </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mt-4">
                      <div className="card-body">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="status" className="h5">Status</label>
                            <Field as="select" name="status" className={`${errors.status && touched.status ? "is-invalid" : null} form-control`}>
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
                        </div>
                        <CategorySelect setParentCategory={setParentCategory} categories={categories} />
                        <div className="form-group">
                          <button type="submit" className={`${!(dirty && isValid) ? "disabled" : ""} btn btn-primary`}>Create</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </main>
          </div >
        )
      }}
    </Formik >
  )
}

export default New;