import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import { Button } from "reactstrap";
import { load } from "recaptcha-v3";

const CAPTCHA_CLIENT_KEY = '6LfUb-EUAAAAAEBdxIpMqGCi2e7ScZ4I4eqVhzAh';

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [recaptcha, setRecaptcha] = useState(null);
  const history = useHistory();
  const pathParams = useParams();

  const onStartSession = useCallback(async () => {
    const recaptchaToken = await recaptcha.execute('start_session');
    const { ok, session, token, error } = await network.post('/api/session',
        {
          recaptcha: recaptchaToken,
        });
    if (!ok) {
      if (error.status_code === 401) {
        localStorage.clear();
        history.replace('/login', { expired: true });
        return;
      }

      return console.log({ error });
    }
    localStorage.setItem('wg:token', token);
    history.replace(`/play/${session.id}`);
  }, [recaptcha]);

  useEffect(() => {
    (async () => {
      const _recaptcha = await load(CAPTCHA_CLIENT_KEY);
      setRecaptcha(_recaptcha);
    })();
  });

  useEffect(() => {
    (async () => {
      if (pathParams.sessionId) {
        const { ok, session, error } = await network.get('/api/session');
        if (!ok) {
          if (error.status_code === 401) {
            localStorage.clear();
            history.replace('/login', { expired: true });
            return;
          }

          dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error });
          return;
        }
        dispatch({ type: ACTION_START_SESSION, status: STATUS_OK, session });
      } else {
        dispatch({ type: ACTION_START_SESSION, status: STATUS_PENDING });
        const { ok, session, error } = await network.get('/api/session');
        if (!ok) {
          if (error.status_code === 401) {
            localStorage.clear();
            history.replace('/login', { expired: true });
            return;
          }

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
  }, [dispatch, pathParams.sessionId]);

  const onSuccess = useCallback(async (response) => {
    const { token, profile, default_collection: defaultCollection } = await network.post('/api/auth', {
      access_code: response.code,
    });

    localStorage.setItem('wg:token', token);
    dispatch({ type: ACTION_LOGIN, status:STATUS_OK, token, profile, defaultCollection });
    history.replace('/collections');
  }, [dispatch, history]);

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
      <section className="row">
        <div className="col">
          {state.getIn(['profile', 'isLoggedIn']) &&
          <Link className="btn btn-sm btn-link btn-block" to="/collections">Back to collections</Link>
          }
          {!state.getIn(['profile', 'isLoggedIn']) &&
          <>
            <div className="row mt-2 justify-content-center">
              <div className="col-6">
                <Button
                    disabled={!recaptcha}
                    color="primary"
                    block
                    onClick={onStartSession}
                >TRY AGAIN!</Button>
              </div>
            </div>

            <GoogleLogin
              clientId={'976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com'}
              onSuccess={onSuccess}
              responseType={'code'}
              className="mt-5"
            />
            <p className="text-muted">
              ...to keep track of your progress
            </p>
          </>
          }
        </div>
      </section>
      }
    </div>
  );
};
