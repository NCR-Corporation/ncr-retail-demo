import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col } from "reactstrap";
import * as Yup from "yup";
import DatePicker from './DatePicker';
import "react-datepicker/dist/react-datepicker.css";

const ItemPriceForm = ({ selectedItem, siteId, toggleAndRefresh }) => {

  const createItemPriceSchema = Yup.object().shape({
    // version:
  })

  const initialValues = {
    price: 0,
    currency: 'USD',
    effectiveDate: new Date().toISOString(),
    endDate: '',
    status: 'ACTIVE',
    basePrice: '',
    itemPriceType: '',
    tareWeightUom: '',
    tareWeight: '',
    precision: '',
    includesContainer: '',
    quantityPriceItem: '',
    dynamicAttributes: '',
    priceId: '',
    version: 1
  }

  const handleSumbit = async values => {
    let data = {};
    for (const key in values) {
      // Remove empty fields.
      if (values[key] !== "") {
        data[key] = values[key];
      }
    }
    let priceCode = data['priceId'];
    data["priceId"] = {
      "itemCode": selectedItem.itemId.itemCode,
      "enterpriseUnitId": siteId,
      "priceCode": priceCode
    };
    console.log('data', data);
    let itemPrices = { "itemPrices": [data] };

    fetch('/api/item-prices', { method: 'POST', body: JSON.stringify(itemPrices) })
      .then(response => response.json())
      .then(data => toggleAndRefresh())
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createItemPriceSchema}
      onSubmit={handleSumbit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Form>
            <Row>
              <Col>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="priceId">Price ID</label>
                    <Field name="priceId" id="priceId" className={`${errors.referenceId && touched.referenceId ? "is-invalid" : null} form-control`} />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="price">Price</label>
                    <Field name="price" id="price" className={`${errors.referenceId && touched.referenceId ? "is-invalid" : null} form-control`} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currency">Currency</label>
                    <Field as="select" name="currency" className={`${errors.currency && touched.currency ? "is-invalid" : null} form-control`}>
                      <option value="USD">USD</option>
                    </Field>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="effectiveDate">Effective Date</label>
                    <DatePicker name="effectiveDate" />
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className={`${!(dirty && isValid) ? "disabled" : ""} btn btn-primary`}>Create</button>
                </div>
              </Col>
            </Row>
          </Form>
        )
      }
      }
    </Formik>
  )
}

export default ItemPriceForm;