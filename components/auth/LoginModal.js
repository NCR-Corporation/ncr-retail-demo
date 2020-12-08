import React from 'react';
import { Modal } from 'reactstrap';
import LoginForm from './LoginForm';

const LoginModal = (props) => {
  const { modalProp, toggle, toggleRegister } = props;

  const showRegisterModal = () => {
    toggle();
    toggleRegister();
  };
  return (
    <Modal isOpen={modalProp} toggle={toggle} size="sm">
      <LoginForm toggle={toggle} showRegisterModal={showRegisterModal} />
    </Modal>
  );
};

export default LoginModal;
