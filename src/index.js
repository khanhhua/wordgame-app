import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { DispatchContext, StateContext } from "./components/context";
import reducer, { initialState } from "./components/reducer";
import { init as initSession } from "./components/session";

const Index = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <App />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

initSession().then(() => {
  ReactDOM.render(<Index />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
