import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Logger from '~/components/api-logger/Logger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, NavItem, Row, Col, Button, Badge } from 'reactstrap';
import FindStoreModal from './FindStoreModal';
import RegisterConsumerModal from '~/components/auth/RegisterConsumerModal';
import LoginModal from '~/components/auth/LoginModal';
import { UserStoreContext } from '~/context/userStore';
import useHeader from '~/lib/hooks/useHeader';
import SubHeader from './SubHeader';
import SearchBar from './SearchBar';
import { UserCartContext } from '~/context/userCart';
import ProfileDropdown from '../auth/ProfileDropdown';

export default function Header({ logs }) {
  let allLogs = logs ?? [];
  let { categories } = useHeader();
  if (categories && categories.logs) {
    allLogs = allLogs.concat(categories.logs);
    categories = categories.categories;
  }
  const { userStore } = useContext(UserStoreContext);
  const { userCart } = useContext(UserCartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleRegisterModal = () => setRegisterModalOpen(!isRegisterModalOpen);
  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
  useEffect(() => {
    if (Object.keys(userStore).length == 0) {
      setIsModalOpen(true);
    }
  }, [isModalOpen]);

  return (
    <div className="bg-white">
      <FindStoreModal modalProp={isModalOpen} toggle={toggleModal} />
      <LoginModal
        modalProp={isLoginModalOpen}
        toggle={toggleLoginModal}
        toggleRegister={toggleRegisterModal}
      />
      <RegisterConsumerModal
        modalProp={isRegisterModalOpen}
        toggle={toggleRegisterModal}
        toggleLogin={toggleLoginModal}
      />
      <header className="section-header shadow-sm">
        <section className="header-top-light border-bottom">
          <Container>
            <Nav className="d-flex justify-content-between row">
              <NavItem>
                <Logger logs={allLogs} />
              </NavItem>
              <NavItem>
                <a href="/admin/dashboard" className="nav-link">
                  <FontAwesomeIcon icon={faCog} size="1x" /> Manage
                </a>
              </NavItem>
            </Nav>
          </Container>
        </section>
        <section className="header-main border-bottom py-3">
          <Container>
            <Row className="align-items-center">
              <Col sm="4" md="3">
                <Link href="/">
                  <a className="logo-text">MART</a>
                </Link>
              </Col>
              <Col sm="8" md="5">
                <SearchBar />
              </Col>
              <Col sm="12" md="4" className="text-md-right">
                {userCart && userCart.totalQuantity > 0 && (
                  <Link href="/cart">
                    <a>
                      <Button color="dark" outline className="mr-1">
                        My Cart
                        <Badge color="warning" className="ml-1">
                          {userCart.totalQuantity}
                        </Badge>
                      </Button>
                    </a>
                  </Link>
                )}
                <ProfileDropdown toggleModalLogin={toggleLoginModal} />
              </Col>
            </Row>
          </Container>
        </section>
        <SubHeader
          categories={categories}
          userStore={userStore}
          setIsModalOpen={setIsModalOpen}
        />
      </header>
    </div>
  );
}
