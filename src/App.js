import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";
import MyCollectionListPage from "./pages/MyCollectionListPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/play">
            <PlayPage />
          </Route>
          <Route exact path="/report">
            <ReportPage />
          </Route>
          <Route exact path="/my-collections">
            <MyCollectionListPage />
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
