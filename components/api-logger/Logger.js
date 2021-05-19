import { useState } from 'react';
import _ from 'lodash';
import { Button, UncontrolledCollapse, Card, CardBody, CardTitle, Container } from 'reactstrap';
import ReactJson from 'react-json-view';
import styles from './Logger.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Logger = ({ logs }) => {
  const [state, setSizes] = useState({
    width: 500,
    height: 500,
    absoluteWidth: 500,
    absoluteHeight: 500,
    absoluteLeft: 0,
    absoluteRight: 0,
    position: null
  });
  const [isActive, setIsActive] = useState(false);

  // On top layout
  const onResize = (_, { size }) => {
    setSizes({ width: size.width, height: size.height });
  };

  const toggleMaximize = () => {
    setSizes({
      width: state.width != window.innerWidth ? window.innerWidth : 500,
      height: state.height != window.innerHeight ? window.innerHeight : 500,
      position: state.position == null ? 0 : null
    });
  };

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
      {isActive && (
        <Draggable handle=".handle">
          <ResizableBox
            minConstraints={[500, 250]}
            maxConstraints={[1000, 1200]}
            resizeHandles={['se', 'ne', 'e', 'n', 's']}
            height={state.height}
            width={state.width}
            onResize={onResize}
            className={state.position == 0 ? styles.full : styles.resizable}
          >
            <div
              style={{
                width: state.width + 'px',
                height: state.height + 'px'
              }}
            >
              <div className={styles.closeBtn}>
                <Button color="light" onClick={toggleMaximize}>
                  {state.width == window.innerWidth && state.height == window.innerHeight ? 'Shrink' : 'Maximize'}
                </Button>
                <Button color="primary" onClick={toggleActive}>
                  Close
                </Button>
              </div>
              <Container className={styles.container}>
                <div className={styles.scroll}>
                  <h4 className="handle pointer-grab">HTTP Requests</h4>
                  {sortedLogs &&
                    sortedLogs.length > 0 &&
                    sortedLogs.map((log, key) => (
                      <motion.div initial="hidden" animate="visible" variants={variants} key={key}>
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
                      </motion.div>
                    ))}
                </div>
              </Container>
            </div>
          </ResizableBox>
        </Draggable>
      )}
    </div>
  );
};

export default Logger;
