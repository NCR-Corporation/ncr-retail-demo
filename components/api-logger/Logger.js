import { useState } from 'react';
import _ from 'lodash';
import {
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
  CardTitle,
  Container,
} from 'reactstrap';
import ReactJson from 'react-json-view';
import styles from './Logger.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const Logger = ({ logs }) => {
  console.log('logger', logs);
  const [isActive, setIsActive] = useState(false);
  console.log;
  let sortedLogs = _.sortBy(logs, (l) => {
    if (l != null && l.req) {
      return l.req.request.headers['Date'];
    }
  });

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <Button color="link" className="nav-link" onClick={toggleActive}>
        <FontAwesomeIcon icon={faChartLine} size="1x" /> API Requests
      </Button>
      <div className={`${styles.logger} ${isActive && styles.active}`}>
        <Button
          color="primary"
          onClick={toggleActive}
          className={styles.closeBtn}
        >
          Close
        </Button>
        <Container className={styles.container}>
          <div className={styles.scroll}>
            <h4>HTTP Requests</h4>
            {sortedLogs &&
              sortedLogs.length > 0 &&
              sortedLogs.map((log, key) => (
                <div key={key}>
                  {log && log.req && log.res && (
                    <Card className="mb-2" style={{ fontFamily: 'monospace' }}>
                      <CardBody>
                        <CardTitle>
                          <strong>
                            {log.req.request.method} {log.req.url}
                          </strong>
                        </CardTitle>
                        <p className="text-muted">
                          {log.req.request.headers['Date']}
                        </p>
                        <a
                          className="btn btn-link pl-0"
                          id={`req-toggler${key}`}
                        >
                          View Request
                        </a>
                        <a className="btn btn-link" id={`res-toggler${key}`}>
                          View Response
                        </a>
                        <UncontrolledCollapse toggler={`#req-toggler${key}`}>
                          <Card>
                            <CardBody>
                              <ReactJson src={log.req} />
                            </CardBody>
                          </Card>
                        </UncontrolledCollapse>
                        <UncontrolledCollapse toggler={`#res-toggler${key}`}>
                          <Card>
                            <CardBody>
                              <ReactJson src={log.res} />
                            </CardBody>
                          </Card>
                        </UncontrolledCollapse>
                      </CardBody>
                    </Card>
                  )}
                </div>
              ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Logger;
