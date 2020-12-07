import React from 'react';
import { Modal } from 'reactstrap';
import RegisterForm from './RegisterForm';

const RegisterConsumerModal = (props) => {
  const { modalProp, toggle, toggleLogin } = props;

  const showLoginModal = () => {
    toggle();
    toggleLogin();
  };

  return (
    <Modal isOpen={modalProp} toggle={toggle} size="sm">
      <RegisterForm showLoginModal={showLoginModal} />
    </Modal>
  );
};

export default RegisterConsumerModal;
