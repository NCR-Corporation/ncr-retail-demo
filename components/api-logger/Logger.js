import { useState } from 'react';
import {
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import styles from './Logger.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';

const Logger = ({ logs }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  console.log('the logs', logs);
  return (
    <div>
      <Button color="link" className="nav-link" onClick={toggleActive}>
        <FontAwesomeIcon icon={faAtlas} size="1x" /> View Requests
      </Button>
      <div className={`${styles.logger} ${isActive && styles.active}`}>
        {logs.map((log, key) => (
          <div>
            <Card>
              <CardBody>
                <CardTitle>
                  {log.req.request.method} {log.req.url}
                </CardTitle>
                <p id={`req-toggler${key}`}>Request Headers</p>
                <p id={`req-toggler${key}`}>Request Headers</p>
                <UncontrolledCollapse toggler={`#req-toggler${key}`}>
                  <Card>
                    <CardBody>
                      {/* <code>{log.req.request.headers}</code> */}
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </CardBody>
            </Card>
            {/* <Button
              color="primary"
              id={`toggler${key}`}
              style={{ marginBottom: '1rem' }}
            >
              Toggle
            </Button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logger;
