import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { DispatchContext, StateContext } from '../components/context';
import {
  ACTION_NEXT_WORD,
  ACTION_SHOW_REPORT,
  STATUS_ERROR,
  STATUS_OK,
  STATUS_PENDING,
} from '../components/constants';
import Loader from './Loader';
import { getNextTerm, getSessionStats, updateStats } from '../services/session';

export default ({ sessionId }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const history = useHistory();

  const [status, setStatus] = useState({ busy: false, error: null });
  const [showingAnswer, setShowingAnswer] = useState(null);

  const [timestamp, setTimestamp] = useState(null);

  const fetchNextWord = useCallback(async () => {
    dispatch({ type: ACTION_NEXT_WORD, status: STATUS_PENDING });
    const { term, hasNext } = await getNextTerm(sessionId);

    if (!term) {
      dispatch({ type: ACTION_NEXT_WORD, status: STATUS_ERROR, error: new Error('Session expired') });
      return;
    }
    dispatch({ type: ACTION_NEXT_WORD, status: STATUS_OK, term, hasNext });
    setTimestamp(Date.now() / 1000);
  }, [dispatch, sessionId]);

  const showReport = useCallback(async () => {
    setStatus({ busy: true });

    const sessionId = state.getIn(['gameSession', 'id']);

    dispatch({ type: ACTION_SHOW_REPORT, status: STATUS_PENDING, sessionId });
    const stats = await getSessionStats(sessionId);

    dispatch({
      type: ACTION_SHOW_REPORT,
      status: STATUS_OK,
      report: { session: stats },
    });
  }, [dispatch, state]);

  const onSelectAnswer = useCallback(
    async (answer) => {
      const termId = state.getIn(['gameSession', 'term', 'id']);
      const wordTags = state.getIn(['gameSession', 'term', 'tags']);
      const correct = wordTags.includes(answer);

      const { ok, error } = await updateStats(sessionId, {
        termId,
        correct,
        seconds: Date.now() / 1000 - timestamp,
      });
      if (!ok) {
        if (error.status_code === 401) {
          localStorage.clear();
          history.replace('/login', { expired: true });
          return;
        }
        return;
      }

      if (!correct) {
        setShowingAnswer({
          correct,
          article: wordTags.includes('MAS')
            ? 'der'
            : wordTags.includes('FEM')
            ? 'die'
            : 'das',
        });
      } else {
        if (state.getIn(['gameSession', 'hasNext'])) {
          await fetchNextWord();
        } else {
          showReport();
        }
      }
    },
    [fetchNextWord, history, sessionId, showReport, state, timestamp]
  );

  const onSkipClick = useCallback(async () => {
    await fetchNextWord();
  }, [fetchNextWord]);

  const onNextClick = useCallback(async () => {
    setShowingAnswer(null);
    if (state.getIn(['gameSession', 'hasNext'])) {
      await fetchNextWord();
    } else {
      showReport();
    }
  }, [fetchNextWord, showReport, state]);

  useEffect(() => {
    (async () => {
      await fetchNextWord();
    })();
  }, [fetchNextWord]);

  const term = state.getIn(['gameSession', 'term']);

  return (
    <section className="row">
      <div className="col">
        <h2 className="text-center text-black-50">Play</h2>
        {!term && <p className="text-center">Loading...</p>}
        {!!term && (
          <>
            <div className="term mt-5 mb-5">
              <div className="text-center display-2 text-break">
                {term.get('word')}
              </div>
              <button className="btn btn-sm btn-link">Meaning >></button>
            </div>

            <div className="actions text-center">
              <div className="btn-group w-75">
                <button
                  className="btn btn-light btn-lg text-white btn-circle bg-masculine"
                  onClick={() => onSelectAnswer('MAS')}
                >
                  Der
                </button>
                <button
                  className="btn btn-light btn-lg text-white btn-circle bg-feminine"
                  onClick={() => onSelectAnswer('FEM')}
                >
                  Die
                </button>
                <button
                  className="btn btn-light btn-lg text-white btn-circle bg-neuter"
                  onClick={() => onSelectAnswer('NEU')}
                >
                  Das
                </button>
              </div>
              <div className="btn-group w-100 mt-5">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={onSkipClick}
                >
                  Skip
                </button>
              </div>
              <div className="text-center mt-5">
                <button className="btn btn-light" onClick={showReport}>
                  I'm done for now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {!!showingAnswer && (
        <Modal isOpen={true}>
          <ModalBody>
            <div
              className="display-2 text-center"
              style={{ wordBreak: 'break-word' }}
            >
              <span className="font-weight-lighter text-muted">
                {term.get('word')}
              </span>
              , <br />
              <span className="font-weight-bold">{showingAnswer.article}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={onNextClick} className="mx-auto">
              Next
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {!!status.busy && <Loader />}
    </section>
  );
};
