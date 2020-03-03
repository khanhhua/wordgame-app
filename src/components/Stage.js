import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { DispatchContext, StateContext } from "../components/context";
import network from "../components/network";
import {
  ACTION_NEXT_WORD,
  ACTION_SHOW_REPORT,
  ACTION_ADD_TO_COLLECTION,
  STATUS_ERROR,
  STATUS_OK,
  STATUS_PENDING,
} from "../components/constants";

export default ({ sessionId }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [showingAnswer, setShowingAnswer] = useState(null);

  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchNextWord();
    })();
  }, [sessionId]);

  const fetchNextWord = useCallback(async () => {
    const cursor = state.getIn(['gameSession','cursor']);
    dispatch({ type: ACTION_NEXT_WORD, status: STATUS_PENDING });
    const { ok, term, cursor: newCursor, has_next: hasNext, error } = await network.get(`/api/words?cursor=${cursor || ''}`);
    if (!ok) {
      dispatch({ type: ACTION_NEXT_WORD, status: STATUS_ERROR, error });
      return;
    }
    dispatch({ type: ACTION_NEXT_WORD, status: STATUS_OK, term, hasNext, cursor: newCursor });
    setTimestamp(Date.now() / 1000);
  }, [dispatch, state]);

  const onSelectAnswer = useCallback(async (answer) => {
    const wordId = state.getIn(['gameSession','term', 'id']);
    const wordTags = state.getIn(['gameSession','term', 'tags']);
    const correct = wordTags.includes(answer);
    const { ok } = await network.post(`/api/stats`, {
      session_id: sessionId,
      term_id: wordId,
      correct,
      seconds: (Date.now() / 1000) - timestamp,
    });
    if (!ok) {
      return;
    }

    setShowingAnswer({
      correct,
      article: wordTags.includes('MAS') ? 'der' : wordTags.includes('FEM') ? 'die' : 'das',
    });
  }, [dispatch, timestamp, state.getIn(['gameSession','term'])]);

  const showReport = useCallback(async () => {
    const sessionId = state.getIn(['gameSession', 'id']);
    await network.delete(`/api/session`);

    dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_PENDING, sessionId });
    const { ok, error, report } = await network.get(`/api/stats/${sessionId}`);

    if (!ok) {
      dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_ERROR, error });
      return;
    }

    dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_OK, report });
  }, [dispatch, state.getIn(['gameSession','term'])]);

  const onSkipClick = useCallback(async () => {
    const wordId = state.getIn(['gameSession','term', 'id']);
    const { ok } = await network.post(`/api/stats`, {
      term_id: wordId,
      skipped: true,
    });
    if (!ok) {
      return;
    }

    await fetchNextWord();
  }, [dispatch, state.getIn(['gameSession','term'])]);

  const onLearnClick = useCallback(async () => {
    const term = state.getIn(['gameSession','term']);
    const defaultCollectionId = state.getIn(['profile', 'defaultCollection', 'id']);

    dispatch({ type: ACTION_ADD_TO_COLLECTION, status: STATUS_PENDING });
    const { ok, collection, error } = await network.post(`/api/me/collections/${defaultCollectionId}/terms`, {
      term_id: term.get('id'),
    });
    if (!ok) {
      dispatch({ type: ACTION_ADD_TO_COLLECTION, status: STATUS_ERROR, error });
      return;
    }

    dispatch({ type: ACTION_ADD_TO_COLLECTION, status: STATUS_OK, collection });
    if (state.getIn(['gameSession','hasNext'])) {
      await fetchNextWord();
    } else {
      showReport();
    }
  }, [dispatch, state.getIn(['gameSession', 'term']), state.getIn(['gameSession', 'hasNext'])]);

  const onNextClick = useCallback(async () => {
    setShowingAnswer(null);
    if (state.getIn(['gameSession','hasNext'])) {
      await fetchNextWord();
    } else {
      showReport();
    }
  }, [dispatch, state.getIn(['gameSession', 'term']), state.getIn(['gameSession', 'hasNext'])]);

  const term = state.getIn(['gameSession','term']);

  return (
    <section className="row">
      <div className="col">
        <h2 className="text-center text-black-50">Play</h2>
        {!term &&
        <p className="text-center">Loading...</p>
        }
        {!!term &&
        <>
          <div className="term mt-5 mb-5">
            <div className="text-center display-2 text-break">
              {term.get('word')}
            </div>
            <button className="btn btn-sm btn-link">Meaning >></button>
          </div>

          <div className="actions text-center">
            <div className="btn-group w-75">
              <button className="btn btn-light btn-lg text-white btn-circle"
                      style={{ backgroundColor: 'rgb(32,59,129)' }}
                      onClick={() => onSelectAnswer('MAS')}>
                Der
              </button>
              <button className="btn btn-light btn-lg text-white btn-circle"
                      style={{ backgroundColor: 'rgb(207,25,14)' }}
                      onClick={() => onSelectAnswer('FEM')}>
                Die
              </button>
              <button className="btn btn-light btn-lg text-white btn-circle"
                      style={{ backgroundColor: 'rgb(84,159,14)' }}
                      onClick={() => onSelectAnswer('NEU')}>
                Das
              </button>
            </div>
            <div className="btn-group w-100 mt-5">
              <button className="btn btn-light btn-sm"
                      onClick={onLearnClick}
              >
                Learn
              </button>
              <button className="btn btn-primary btn-sm"
                      onClick={onSkipClick}
              >
                Skip
              </button>
            </div>
            <div className="text-center mt-5">
              <button
                className="btn btn-light"
                onClick={showReport}
              >I'm done for now</button>
            </div>
          </div>
        </>
        }
      </div>
      {!!showingAnswer &&
      <Modal isOpen={true}>
        <ModalBody>
          <div className="display-2 text-center" style={{ wordBreak: 'break-word' }}>
            <span className="font-weight-lighter text-muted">{term.get('word')}</span>, <br/>
            <span className="font-weight-bold">{showingAnswer.article}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={onNextClick}
            className="mx-auto"
          >Next</Button>
        </ModalFooter>
      </Modal>
      }
    </section>
  );
};
