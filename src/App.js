import React, { useContext, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";
import CollectionListPage from "./pages/CollectionListPage";
import ReportPage from "./pages/ReportPage";
import AppNav from "./components/AppNav";
import { DispatchContext, StateContext } from "./components/context";
import network from "./components/network";
import { ACTION_LOGIN, STATUS_OK } from "./components/constants";

function App() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  useEffect(() => {
    (async () => {
      const isLoggedIn = state.getIn(['profile', 'isLoggedIn']);
      if (isLoggedIn) {
        return;
      } else {
        const accessToken = localStorage.getItem('wg:token');
        if (accessToken) {
          const { ok, profile, default_collection: defaultCollection } = await network.get('/api/auth');
          if (!ok) {
            localStorage.clear();
            return window.location.replace('/#/login');
          }

          dispatch({ type: ACTION_LOGIN, status: STATUS_OK, profile, defaultCollection });
        }
      }
    })();
  }, [dispatch, state.getIn(['profile', 'isLoggedIn'])]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/play/:sessionId">
            <AppNav />
            <PlayPage />
          </Route>
          <Route exact path="/play">
            <AppNav />
            <PlayPage />
          </Route>
          <Route exact path="/report">
            <AppNav />
            <ReportPage />
          </Route>
          <Route exact path="/collections">
            <AppNav />
            <CollectionListPage />
          </Route>
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
