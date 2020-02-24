import React, { useCallback, useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from "../components/context";
import network from "../components/network";
import { ACTION_NEXT_WORD, ACTION_SHOW_REPORT, STATUS_ERROR, STATUS_OK, STATUS_PENDING } from "../components/constants";

export default ({ sessionId }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  useEffect(() => {
    (async () => {
      await fetchNextWord();
    })();
  }, [sessionId]);

  const fetchNextWord = useCallback(async () => {
    const cursor = state.getIn(['gameSession','cursor']);
    dispatch({ type: ACTION_NEXT_WORD, status: STATUS_PENDING });
    const { ok, word, cursor: newCursor, hasNext, error } = await network.get(`/api/words?cursor=${cursor || ''}`);
    if (!ok) {
      dispatch({ type: ACTION_NEXT_WORD, status: STATUS_ERROR, error });
      return;
    }
    dispatch({ type: ACTION_NEXT_WORD, status: STATUS_OK, word, hasNext, cursor: newCursor });
  }, [dispatch, state]);

  const onSelectAnswer = useCallback(async (answer) => {
    const wordId = state.getIn(['gameSession','word', 'id']);
    const wordGender = state.getIn(['gameSession','word', 'gender']);
    const { ok } = await network.post(`/api/stats`, {
      wordId,
      correct: answer === wordGender,
    });
    if (!ok) {
      return;
    }

    if (state.getIn(['gameSession','hasNext'])) {
      await fetchNextWord();
    } else {
      const sessionId = state.getIn(['gameSession', 'id']);
      dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_PENDING, sessionId });
      const statsRes = await network.get(`/api/stats/${sessionId}`);

      if (!statsRes.ok) {
        dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_ERROR, error: statsRes.error });
        return;
      }

      dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_OK, report: statsRes.report });
    }
  }, [dispatch, state.getIn(['gameSession','word'])]);

  const word = state.getIn(['gameSession','word']);

  return (
    <section className="row">
      <div className="col">
        <h2>Play</h2>
        {!word &&
        <p className="text-center">Loading...</p>
        }
        {!!word &&
        <>
          <div className="word mt-5 mb-5">
            <div className="text-center display-1">
              {word.get('text')}
            </div>
            <button className="btn btn-sm btn-link">Meaning >></button>
          </div>

          <div className="actions">
            <div className="btn-group w-100">
              <button className="btn btn-light btn-lg"
                      onClick={() => onSelectAnswer('m')}>
                Der
              </button>
              <button className="btn btn-light btn-lg"
                      onClick={() => onSelectAnswer('f')}>
                Die
              </button>
              <button className="btn btn-light btn-lg"
                      onClick={() => onSelectAnswer('n')}>
                Das
              </button>
            </div>
            <div className="btn-group w-100 mt-5">
              <button className="btn btn-light btn-sm"
                      onClick={() => null}
              >
                Learn
              </button>
              <button className="btn btn-primary btn-sm"
                      onClick={() => fetchNextWord()}
              >
                Skip
              </button>
            </div>
          </div>
        </>
        }
      </div>
    </section>
  );
};
