import React, { useCallback, useContext, useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { load } from "recaptcha-v3";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Alert, Button } from "reactstrap";
import { DispatchContext } from "../components/context";
import { ACTION_LOGIN, STATUS_OK } from "../components/constants";
import network from "../components/network";
import {createSession} from "../components/session";

const CAPTCHA_CLIENT_KEY = "6LfUb-EUAAAAAEBdxIpMqGCi2e7ScZ4I4eqVhzAh";

export default () => {
  const [recaptcha, setRecaptcha] = useState(null);
  const dispatch = useContext(DispatchContext);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const onSuccess = useCallback(
    async (response) => {
      const { accessToken: token, profileObj } = response;

      localStorage.setItem("wg:profile", JSON.stringify(profileObj));
      localStorage.setItem("wg:token", token);
      dispatch({
        type: ACTION_LOGIN,
        status: STATUS_OK,
        token,
      });
      history.replace("/collections");
    },
    [dispatch, history]
  );
  const onStartSession = useCallback(async () => {
    // const recaptchaToken = await recaptcha.execute("start_session");
    const sessionId = await createSession([]);
    history.replace(`/play/${sessionId}`);
  }, [recaptcha]);

  useEffect(() => {
    console.log(params);
    (async () => {
      const _recaptcha = await load(CAPTCHA_CLIENT_KEY);
      setRecaptcha(_recaptcha);
    })();
  });

  return (
    <div className="container login-page">
      {!!(location.state && location.state.expired) && (
        <Alert
          className="mt-2 alert-float"
          isOpen={true}
          color="warning"
          toggle={() => history.replace("/login")}
        >
          <h4 className="alert-heading">Your session has expired.</h4>
          <p className="mt-3 text-center text-sm-left">
            Without logging in, your session lasts for only for 10 minutes.
          </p>
        </Alert>
      )}
      <section className="row">
        <div className="col">
          <h3
            style={{
              marginTop: "50%",
            }}
          >
            Hallo Deutsch
          </h3>
          <GoogleLogin
            clientId={
              "976856176051-ietkcknpua13udt2tucm8sbecik7h5rt.apps.googleusercontent.com"
            }
            onSuccess={onSuccess}
            responseType={"token"}
            isSignedIn={true}
          />
          <p className="text-muted">
            ...to coup with the insane irregularity in the German language.
          </p>
        </div>
      </section>
      <div className="row justify-content-center">
        <div className="col-6">
          <Button
            disabled={!recaptcha}
            color="primary"
            block
            onClick={onStartSession}
          >
            TRY NOW!
          </Button>
        </div>
      </div>
    </div>
  );
};
