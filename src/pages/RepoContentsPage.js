import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DispatchContext, StateContext } from '../components/context';
import { getRepoContents } from '../services/github';
import * as settings from '../services/settings';
import {
  ACTION_LIST_REPO_CONTENTS,
  ACTION_CHOOSE_COLLECTION,
  STATUS_OK,
  STATUS_PENDING,
} from '../components/constants';

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      dispatch({
        type: ACTION_LIST_REPO_CONTENTS,
        status: STATUS_PENDING,
      });

      const contents = await getRepoContents();
      dispatch({
        type: ACTION_LIST_REPO_CONTENTS,
        status: STATUS_OK,
        contents,
      });
    })();
  }, [dispatch]);

  const onChooseCollection = useCallback(
    (collection) => {
      settings
          .set('repo.current', {
            name: collection.get('name'),
            url: collection.get('url'),
          })
          .then(() => {
            dispatch({
              type: ACTION_CHOOSE_COLLECTION,
              collection,
            });
            history.replace('/collections');
          })
    },
    [dispatch, history]
  );

  const contents = state.getIn(['repo', 'contents']);

  return (
    <div className="container repo-contents-page">
      <section className="row">
        <div className="col">
          <div className="list-group list-group-flush">
            {contents.map((item) => (
              <div className="list-group-item">
                {item.get('name')}
                <button
                  className="btn btn-sm btn-primary float-right"
                  onClick={() => onChooseCollection(item)}
                >
                  Choose
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
