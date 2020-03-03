import React from 'react';
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from "react-router-dom";

export default () => (
  <Navbar light className="bg-light">
    <NavbarBrand>Hallo Deutsch</NavbarBrand>
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
      <NavItem>Logout</NavItem>
    </Nav>
  </Navbar>
);
