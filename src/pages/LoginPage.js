import React, { useCallback, useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { DispatchContext } from "../components/context";
import { ACTION_LOGIN, STATUS_OK } from "../components/constants";
import network from "../components/network";

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const history = useHistory();

  const onSuccess = useCallback(async (response) => {
    const { token, profile, default_collection: defaultCollection } = await network.post('/api/auth', {
      access_code: response.code,
    });

    localStorage.setItem('wg:token', token);
    dispatch({ type: ACTION_LOGIN, status:STATUS_OK, token, profile, defaultCollection });
    history.replace('/collections');
  }, [dispatch, history]);

  return (
    <div className="container login-page">
      <section className="row">
        <div className="col">
          <h3 style={{
            marginTop: '50%',
          }}>Hallo Deutsch</h3>
          <GoogleLogin
            clientId={'976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com'}
            redirectUri={'http://localhost:3000/auth/google'}
            onSuccess={onSuccess}
            responseType={'code'}
          />
          <p className="text-muted">
            ...to coup with the insane irregularity in the German language.
          </p>
        </div>
      </section>
      <div className="row justify-content-center">
        <div className="col-6">
          <Link
            className="btn btn-primary btn-lg btn-block"
            to="/play"
          >TRY NOW!</Link>
        </div>
      </div>
    </div>
  );
};
