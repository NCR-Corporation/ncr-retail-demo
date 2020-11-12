import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {
  Button, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav
} from 'reactstrap';


const Header = ({ site }) => {
  // console.log('the cookies', site);

  const preventDefault = f => e => {
    e.preventDefault();
    f(e);
  }

  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleParam = setValue => e => setValue(e.target.value);

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
      <section className="border-bottom header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6">
              <Link href="/">
                Sample</Link>
            </div>
            <div className="col-lg-6 col-12 col-sm-12">
              <form onSubmit={handleSubmit} className="search">
                <div className="input-group w-100">
                  <input type="text" className="form-control" placeholder="Search" name="query" value={query} onChange={handleParam(setQuery)} aria-label="Search" />
                  <div className="input-group-append">
                    <Button color="primary" type="submit"><FontAwesomeIcon icon={faSearch} /></Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <Link href="/admin/dashboard">
                Admin
              </Link>
              <div className="d-flex flex-row-reverse">
                <Nav>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Your Store
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                </DropdownItem>
                      <DropdownItem>
                        Option 2
                </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Reset
                </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header;