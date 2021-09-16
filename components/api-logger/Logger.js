import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import { Button, UncontrolledCollapse, Card, CardBody, CardTitle, Container } from 'reactstrap';
import styles from './Logger.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const Logger = ({ logs }) => {
  const [isActive, setIsActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const DynamicReactJSON = dynamic(import('react-json-view'), { ssr: false });

  let sortedLogs = _.sortBy(logs, (l) => {
    if (l != null && l.req) {
      return l.req.request.headers['Date'];
    }
  });

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <Button color="link" className="nav-link" onClick={toggleActive}>
        <FontAwesomeIcon icon={faChartLine} size="1x" /> API Requests
      </Button>
      {isActive && (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            position: 'fixed',
            left: 0,
            top: 0,
            background: '#eee',
            zIndex: 100
          }}
        >
          <Button color="primary" onClick={toggleActive}>
            Close
          </Button>
          <Container className={styles.container} fluid>
            <div className={styles.scroll}>
              <h4 className="handle pointer-grab">HTTP Requests</h4>
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
                          <p className="text-muted">{log.req.request.headers['Date']}</p>
                          <a className="btn btn-link pl-0" id={`req-toggler${key}`}>
                            View Request
                          </a>
                          <a className="btn btn-link" id={`res-toggler${key}`}>
                            View Response
                          </a>
                          <UncontrolledCollapse toggler={`#req-toggler${key}`}>
                            <Card>
                              <CardBody>
                                <DynamicReactJSON src={log.req} style={{ fontSize: '12px' }} />
                              </CardBody>
                            </Card>
                          </UncontrolledCollapse>
                          <UncontrolledCollapse toggler={`#res-toggler${key}`}>
                            <Card>
                              <CardBody>
                                <DynamicReactJSON src={log.res} style={{ fontSize: '12px' }} />
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
      )}
    </div>
  );
};

export default Logger;
