import { useState } from 'react';
import Link from 'next/link';
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
    <nav className="navbar navbar-main navbar-expand-lg">
      <Container>
        <Navbar expand="md" className="p-0">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link href="/catalog">
                  <a className="pl-0 nav-link">
                    <strong>All Items</strong>
                  </a>
                </Link>
              </NavItem>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => {
                  let children = category.children;
                  delete children['array'];
                  if (Object.keys(children).length > 0) {
                    return (
                      <UncontrolledDropdown
                        nav
                        inNavbar
                        key={category.nodeCode}
                      >
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
                    <NavItem key={category.nodeCode}>
                      <Link href={`/category/${category.nodeCode}`}>
                        <a>{category.title.value}</a>
                      </Link>
                    </NavItem>
                  );
                })}
            </Nav>
          </Collapse>
        </Navbar>
        <Navbar expand="md" className="p-0">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret suppressHydrationWarning>
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
    </nav>
  );
};

export default SubHeader;
