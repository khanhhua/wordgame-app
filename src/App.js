import React, { useContext } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";

import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/LoginPage";
import CollectionListPage from "./pages/CollectionListPage";
import ReportPage from "./pages/ReportPage";
import AppNav from "./components/AppNav";
import { DispatchContext, StateContext } from "./components/context";
import EditCollectionModal from "./components/EditCollectionModal";

function App() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

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
          <Route
            path="/collections"
            render={() => {
              if (!state.getIn(["profile", "isLoggedIn"])) {
                return <Redirect to="/login" />;
              }

              return (
                <>
                  <AppNav />
                  <CollectionListPage />
                  <Route path="/collections/:collectionId">
                    <EditCollectionModal />
                  </Route>
                </>
              );
            }}
          />
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
