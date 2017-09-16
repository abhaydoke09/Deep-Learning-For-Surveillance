import React from 'react';
import logo from '../logo.svg'


const Navbar = () => {
  return(
    <nav className="navbar navbar-dark bg-dark">
  <a className="navbar-brand" href="#">
    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
    SmartHawk
  </a>
</nav>
  );
}

export default Navbar;
