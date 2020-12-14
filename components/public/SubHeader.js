import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const SubHeader = ({ categories, userStore, setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container className="py-2">
      <Navbar expand="md" className="p-0" light color="faded">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {categories && categories.length > 0 && (
            <Nav navbar>
              <NavItem>
                <Link href="/catalog">
                  <a className="pl-0 nav-link">
                    <strong>All Items</strong>
                  </a>
                </Link>
              </NavItem>
              {categories.map((category) => {
                let children = category.children;
                delete children['array'];
                if (Object.keys(children).length > 0) {
                  return (
                    <UncontrolledDropdown nav inNavbar key={category.nodeCode}>
                      <DropdownToggle nav caret>
                        {category.title.value}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {Object.keys(children).map((child) => (
                          <Link
                            key={children[child].nodeCode}
                            href={`/category/${children[child].nodeCode}`}
                          >
                            <DropdownItem>
                              {children[child].title.value}
                            </DropdownItem>
                          </Link>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  );
                }
                return (
                  <UncontrolledDropdown nav inNavbar key={category.nodeCode}>
                    <DropdownToggle nav>
                      <Link href={`/category/${category.nodeCode}`}>
                        <a className="text-darker">{category.title.value}</a>
                      </Link>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                );
              })}
            </Nav>
          )}
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret suppressHydrationWarning>
                <FontAwesomeIcon icon={faStore} />{' '}
                {userStore != undefined ? userStore.siteName : 'Set Store'}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => setIsModalOpen(true)}>
                  Change Store
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default SubHeader;
