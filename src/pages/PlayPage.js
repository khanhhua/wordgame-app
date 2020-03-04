import React, { useCallback, useContext, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { DispatchContext, StateContext } from "../components/context";
import network from "../components/network";
import {
  ACTION_LOGIN,
  ACTION_START_SESSION, SESSION_STATUS_DONE, SESSION_STATUS_PLAYING,
  STATUS_ERROR,
  STATUS_OK,
  STATUS_PENDING
} from "../components/constants";
import Stage from "../components/Stage";
import Report from "../components/Report";
import GoogleLogin from "react-google-login";

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const history = useHistory();
  const pathParams = useParams();

  useEffect(() => {
    (async () => {
      if (pathParams.sessionId) {
        const { ok, session, error } = await network.get('/api/session');
        if (!ok) {
          dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error });
          return;
        }
        dispatch({ type: ACTION_START_SESSION, status: STATUS_OK, session });
      } else {
        dispatch({ type: ACTION_START_SESSION, status: STATUS_PENDING });
        const { ok, session, error } = await network.get('/api/session');
        if (!ok) {
          dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error });
          return;
        }

        if (!session) {
          const { ok: createOK, session: createdSession, error: createError } = await network.post('/api/session');
          if (!createOK) {
            dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error: createError });
            return;
          }

          dispatch({ type: ACTION_START_SESSION, status: STATUS_OK, session: createdSession });
        } else {
          dispatch({ type: ACTION_START_SESSION, status: STATUS_OK, session });
        }
      }
    })();
  }, []);

  const onLoginSuccess = useCallback(async (response) => {
    const { ok, token, profile } = await network.post('/api/auth', {
      tokenId: response.tokenId,
    });

    localStorage.setItem('wg:token', token);
    dispatch({ type: ACTION_LOGIN, status:STATUS_OK, token, profile });
    history.replace('/collections'); // TODO Should be redirected to a more personl page
  }, [dispatch]);

  const session = state.getIn(['gameSession']);

  return (
    <div className="container play-page">
      {!(session && session.get('id')) &&
      <section className="row">
        <div className="col">
          <div
            className="btn btn-primary btn-lg w-100"
            style={{ marginTop: '75%' }}
          >
            START
          </div>
        </div>
      </section>
      }
      {!!(session && session.get('id') && session.get('status') === SESSION_STATUS_PLAYING) &&
      <Stage sessionId={session.get('id')} />
      }
      {!!(session && session.get('id') && session.get('status') === SESSION_STATUS_DONE) &&
      <Report sessionId={session.get('id')} />
      }
      {!!(session && session.get('id') && session.get('status') === SESSION_STATUS_DONE) &&
      <session className="row">
        <div className="col">
          <Link className="btn btn-sm btn-link btn-block" to="/collections">Back to collections</Link>
          {!state.getIn(['profile', 'isLoggedIn']) &&
          <>
            <GoogleLogin
                clientId={'976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com'}
                redirectUri={'http://localhost:3000/auth/google'}
                onSuccess={onLoginSuccess}
                // responseType={'code'}
                className="mt-5"
            />
            <p className="text-muted">
              ...to keep track of your progress
            </p>
          </>
          }
        </div>
      </session>
      }
    </div>
  );
};
