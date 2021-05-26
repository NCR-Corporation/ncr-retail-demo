import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ConfigurationModal = ({ modalProp, toggle }) => {
  return (
    <div>
      <Modal isOpen={modalProp} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex flex-columns border-none bg-brand-primary text-white">
          <span className="font-weight-bold h3">Welcome to Mart</span>
        </ModalHeader>
        <ModalBody className="py-4">
          <p>
            <span role="img" aria-label="Wave">
              👋
            </span>
            Hey there,
          </p>
          <p>{`Thank you for downloading MART and getting started with NCR's APIs. In order for this application to run, there are a couple tasks that need to be completed.`}</p>
          <p>
            <strong>Required Items</strong>
          </p>
          <ul>
            <li>{`A Sandbox account from NCR's Try It Out or a pre-created organization in NCR.`}</li>
            <li>
              Access Tokens updated in <code>.env.local</code>
            </li>
          </ul>
          <p>
            Be sure to{' '}
            <a href="https://github.com/NCR-Corporation/ncr-retail-demo" target="_blank" rel="noreferrer">
              read the README
            </a>{' '}
            with more detailed instructions on how to get started.
          </p>
          <p>
            Once those items are filled out, you can visit the <a href="/admin/dashboard">to pre-seed the database</a> with test data. Otherwise this site <em>{`isn't that exciting.`}</em>
          </p>
          <p>
            Have any questions or issues getting started?{' '}
            <a href="https://github.com/NCR-Corporation/ncr-retail-demo/issues/new?assignees=&labels=&template=1.Bug_report.md" target="_blank" rel="noreferrer">
              Create an issue in the Github repo
            </a>{' '}
            and we will get back to you within one business day!
          </p>
          <small>
            Psst - once the keys are added as environment variables, this modal will go away. Visit <code>/components/public/Header.js</code> for the conditional.
          </small>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfigurationModal;
