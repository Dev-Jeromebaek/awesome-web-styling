import React, { Fragment } from 'react';
import { Navbar } from 'reactstrap';
import logo from '../../public/icons/logo.svg';
import GlobalNavbarSelectTab from './GlobalNavbarSelectTab';

const GlobalNavbar = () => {
  return (
    <Fragment>
      <div style={{ marginTop: '56px' }} />
      <Navbar className="fixed-top shadow-sm" color="dark" expand="md">
        <a href="/">
          <img src={logo} width="100" alt="TMON logo" />
        </a>
        <GlobalNavbarSelectTab />
      </Navbar>
    </Fragment>
  );
};
export default GlobalNavbar;
