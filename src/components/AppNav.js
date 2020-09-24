import React, { useCallback, useContext } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { DispatchContext, StateContext } from './context';
import { ACTION_LOGOUT } from './constants';

export default () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const onLogoutClick = useCallback(() => {
    dispatch({ type: ACTION_LOGOUT });
    window.localStorage.clear();
    window.location.replace('/login');
  }, []);

  return (
    <Navbar light className="bg-light">
      <NavbarBrand className="font-weight-lighter">Hallo Deutsch</NavbarBrand>
      {!!state.getIn(['profile', 'isLoggedIn']) && (
        <Nav className="mx-auto">
          <NavLink to="/collections" exact className="nav-item px-2">
            Collections
          </NavLink>
          <NavLink to="/report" exact className="nav-item px-2">
            Report
          </NavLink>
        </Nav>
      )}
      {!!state.getIn(['profile', 'isLoggedIn']) && (
        <Nav>
          <NavItem onClick={onLogoutClick}>Logout</NavItem>
        </Nav>
      )}
    </Navbar>
  );
};
