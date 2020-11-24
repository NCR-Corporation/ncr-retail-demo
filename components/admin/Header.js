import React, { useState } from 'react';
import Link from 'next/link';

const Header = ({ }) => {
  return (
    <div>
      <header className="section-header bg-white shadow-sm">
        <section className="header-top-light border-bottom">
          <div className="container">
            <nav className="d-flex justify-content-end row">
              <ul className="nav">
                <li className="nav-item">
                  <a href="/" className="nav-link">Home</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <section className="header-main border-bottom py-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 col-lg-3 col-sm-4 col-12">
                <Link href="/admin/dashboard" className="logo-text">
                  <a className="logo-text">MARKET</a>
                  {/* <img className="logo" src="/images/logo.png"></img> */}
                </Link>
              </div>
              <div className="col text-md-right">
                <div>
                  <Link href="/admin/sites/new" ><a className="btn btn-primary ml-1">New Site</a></Link>
                  <Link href="/admin/category/new"><a className="btn btn-primary ml-1">New Category</a></Link>
                  <Link href="/admin/item/new"><a className="btn btn-primary ml-1">New Item</a></Link>
                  <a href="#" className="btn btn-outline-primary ml-1">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  )
}

export default Header;