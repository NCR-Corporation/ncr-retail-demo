import { useState } from 'react';
import useOrder from '~/lib/swr/useOrder';
import { mutate } from 'swr';
import { Alert, Button, Card, CardBody, Col, Row, Spinner } from 'reactstrap';

export default function OrderForm({ orderId }) {
  const { order, isLoading, isError } = useOrder(orderId);
  const [showAlert, setShowAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  const updateOrderStatus = (status) => {
    fetch(`/api/order/${orderId}`, {
      method: 'POST',
      body: JSON.stringify({
        siteId: order.data.enterpriseUnitId,
        orderId: order.data.id,
        values: {
          status
        }
      })
    })
      .then((res) => res.json())
      .then(() => {
        mutate(`/api/order/${orderId}`);
        setShowAlert({
          status: 200,
          message: `Order status updated to ${status}`
        });
        setVisible(true);
      });
  };
  return (
    <div>
      {isLoading && (
        <div className="my-4 d-flex justify-content-center">
          <Spinner color="primary" />
        </div>
      )}
      {isError && <small className="text-muted">{`Uhoh, we've hit an error.`}</small>}
      {!isError && !isLoading && (
        <div>
          <Alert toggle={onDismiss} isOpen={visible} className="my-4" color={showAlert.status == 200 ? 'success' : 'danger'}>
            {showAlert.message}
          </Alert>
          <Row>
            <Col>
              <h4 className="mb-2">Edit Order</h4>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Card className="mb-3">
                <CardBody>
                  <p>{order.data.id}</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-3">
                <CardBody>
                  <Button
                    color={`${order.data.status != 'OrderPlaced' ? 'secondary' : 'primary'}`}
                    block
                    disabled={`${order.data.status != 'OrderPlaced' ? 'disabled' : ''}`}
                    onClick={() => updateOrderStatus('ReceivedForFulfillment')}
                  >
                    Set Order Received
                  </Button>
                  <Button
                    block
                    color={`${order.data.status != 'ReceivedForFulfillment' ? 'secondary' : 'primary'}`}
                    disabled={`${order.data.status != 'ReceivedForFulfillment' ? 'disabled' : ''}`}
                    onClick={() => updateOrderStatus('InFulfillment')}
                  >
                    Set Order In Fulfillment
                  </Button>
                  <Button
                    block
                    color={`${order.data.status != 'InFulfillment' ? 'secondary' : 'primary'}`}
                    disabled={`${order.data.status != 'InFulfillment' ? 'disabled' : ''}`}
                    onClick={() => updateOrderStatus('Finished')}
                  >
                    Set Order Completed
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
