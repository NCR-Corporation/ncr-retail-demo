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
      <section className="border-bottom header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6">
              <Link href="/admin/dashboard">
                Admin</Link>
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}

export default Header;