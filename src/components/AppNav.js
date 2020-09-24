import {GoogleLogout} from 'react-google-login';
import React, { useCallback, useContext } from 'react';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { DispatchContext, StateContext } from './context';
import { ACTION_LOGOUT } from './constants';

export default () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const onLogout = useCallback(() => {
    dispatch({ type: ACTION_LOGOUT });
    window.localStorage.clear();
  }, []);

  return (
    <Navbar light className="bg-light">
      <NavbarBrand className="font-weight-lighter">Hallo Deutsch</NavbarBrand>
      {!!state.getIn(['profile', 'isLoggedIn']) && ([
        <Nav className="mx-auto">
          <NavLink to="/collections" exact className="nav-item px-2">
            Collections
          </NavLink>
          <NavLink to="/report" exact className="nav-item px-2">
            Report
          </NavLink>
        </Nav>,
        <Nav>
          <GoogleLogout
              clientId={
                "976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com"
              }
              buttonText="Logout"
              onLogoutSuccess={onLogout}
          />
        </Nav>
      ])}
    </Navbar>
  );
};
