import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import LoginForm from './LoginForm';

const LoginModal = (props) => {
  const { modalProp, toggle, toggleRegister, title } = props;

  const showRegisterModal = () => {
    toggle();
    toggleRegister();
  };
  return (
    <Modal isOpen={modalProp} toggle={toggle} size="sm">
      {title && <ModalHeader>{title}</ModalHeader>}
      <LoginForm toggle={toggle} showRegisterModal={showRegisterModal} />
    </Modal>
  );
};

export default LoginModal;
