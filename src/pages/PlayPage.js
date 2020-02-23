import React, { useContext } from 'react';
import { StateContext } from "../components/context";

export default (props) => {
  const state = useContext(StateContext);
  console.log(state);
  const text = state.getIn(['gameSession','word','text']);

  return (
    <div className="container play-page">
      <section className="row">
        <div className="col">
          <h2>Play</h2>

          <div className="word">
            <div className="text-center display-1">
              {text}
            </div>
            <button className="btn btn-sm btn-link">Meaning >></button>
          </div>

          <div className="btn-group w-100">
            <button className="btn btn-lg">
              -R
            </button>
            <button className="btn btn-lg">
              -E
            </button>
            <button className="btn btn-lg">
              -S
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
