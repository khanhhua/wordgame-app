import React, { useCallback } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from "react-router-dom";

export default () => {
  const onLogoutClick = useCallback(() => {
    window.localStorage.clear();
    window.location.href = '/#/login';
  }, []);

  return (
    <Navbar light className="bg-light">
      <NavbarBrand className="font-weight-lighter">Hallo Deutsch</NavbarBrand>
      <Nav className="mx-auto">
        <NavLink
          to="/collections"
          exact
          className="nav-item px-2"
        >Collections</NavLink>
        <NavLink
          to="/report"
          exact
          className="nav-item px-2"
        >Report</NavLink>
      </Nav>
      <Nav>
        <NavItem onClick={onLogoutClick}>Logout</NavItem>
      </Nav>
    </Navbar>
  );
};
