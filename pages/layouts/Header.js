import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import FindStoreModal from './FindStoreModal';
import { UserStoreContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


const Header = ({ categories }) => {
  const { userStore, setUserStore } = useContext(UserStoreContext);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleParam = setValue => e => setValue(e.target.value);
  const preventDefault = f => e => {
    e.preventDefault();
    f(e);
  }

  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: '/catalog',
      query: { query }
    })
  });

  return (
    <div>
      <Head>
        <title>A Simple Sample App</title>
      </Head>
      {Object.keys(userStore).length === 0 && userStore.constructor === Object && <FindStoreModal modalProp={true} />}
      <header className="section-header">
        <section className="header-top-light border-bottom">
          <div className="container">
            <nav className="d-flex justify-content-end row">
              <ul className="nav">
                <li className="nav-item">
                  <a href="/admin/dashboard" className="nav-link">Manage</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <section className="header-main border-bottom py-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 col-lg-3 col-sm-4 col-12">
                <a href="/">
                  <a>
                    <img className="logo" src="/images/banner-ncr-logo.png"></img>
                  </a>
                </a>
              </div>
              <div className="col-md-4 col-lg-5 col-sm-8 col-12">
                <form onSubmit={handleSubmit} className="search">
                  <div className="input-group w-100">
                    <input type="text" className="form-control" placeholder="Search" name="query" value={query} onChange={handleParam(setQuery)} aria-label="Search" />
                    <div className="input-group-append">
                      <Button color="primary" type="submit"><FontAwesomeIcon icon={faSearch} /></Button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-5 col-lg-4 col-12 col-sm-12 text-md-right">
                <div>
                  <Link href="#"><a className="btn btn-outline-primary">Login</a></Link>
                  <Link href="#"><a className="btn btn-outline-secondary ml-1">My Cart</a></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <nav className="navbar navbar-main navbar-expand-lg border-bottom">
          <div className="container">
            <Navbar expand="md" className="p-0">
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="" navbar>
                  <NavItem>
                    <a href="/catalog" className="nav-link pl-0"><strong>All Items</strong></a>
                  </NavItem>
                  {categories.length > 0 && categories.map(category => {
                    let children = category.children;
                    delete children['array'];
                    if (Object.keys(children).length > 0) {
                      return (
                        <UncontrolledDropdown nav inNavbar key={category.nodeCode}>
                          <DropdownToggle nav caret>
                            {category.title.value}
                          </DropdownToggle>
                          <DropdownMenu right>
                            {Object.keys(children).map(child => (
                              <Link key={children[child].nodeCode} href={`/category/${children[child].nodeCode}`}>
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
                        <Link href={`/category/${category.nodeCode}`}><NavLink>{category.title.value}</NavLink></Link>
                      </NavItem>
                    )
                  }
                  )}
                </Nav>
              </Collapse>
            </Navbar>
            <Navbar expand="md" className="p-0">
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret suppressHydrationWarning>
                      {userStore != undefined ? userStore.siteName : 'Change Store'}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => setUserStore(null)}>
                        Change Store
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header;