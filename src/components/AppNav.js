import React, { useCallback, useContext } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { StateContext } from './context';

export default () => {
  const onLogoutClick = useCallback(() => {
    window.localStorage.clear();
    window.location.href = '/#/login';
  }, []);
  const state = useContext(StateContext);

  return (
    <Navbar light className="bg-light">
      <NavbarBrand className="font-weight-lighter">Hallo Deutsch</NavbarBrand>
      {!!state.getIn(['profile', 'isLoggedIn']) &&
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
      }
      {!!state.getIn(['profile', 'isLoggedIn']) &&
      <Nav>
        <NavItem onClick={onLogoutClick}>Logout</NavItem>
      </Nav>
      }
    </Navbar>
  );
};
