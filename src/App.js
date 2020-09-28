import React, {useContext, useEffect} from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';

import PlayPage from './pages/PlayPage';
import LoginPage from './pages/LoginPage';
import CollectionListPage from './pages/CollectionListPage';
import ReportPage from './pages/ReportPage';
import AppNav from './components/AppNav';
import { DispatchContext, StateContext } from './components/context';
import EditCollectionModal from './components/EditCollectionModal';
import RepoContentsPage from './pages/RepoContentsPage';
import {get} from "./services/settings";
import {ACTION_CHOOSE_COLLECTION} from "./components/constants";

function App() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  useEffect(() => {
      (async () => {
          const collection = await get('repo.current');
          dispatch({
              type: ACTION_CHOOSE_COLLECTION,
              collection,
          });
      })();
  }, [dispatch]);

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
              if (!state.getIn(['profile', 'isLoggedIn'])) {
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
          <Route exact path="/settings/repo">
            <AppNav />
            <RepoContentsPage />
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
