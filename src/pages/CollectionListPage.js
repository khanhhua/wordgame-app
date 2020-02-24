import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import network from "../components/network";
import { DispatchContext, StateContext } from "../components/context";
import {
  ACTION_LIST_COLLECTIONS,
  ACTION_START_SESSION,
  STATUS_ERROR,
  STATUS_OK,
  STATUS_PENDING
} from "../components/constants";

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { ok, collections, error } = await network.get('/api/collections');
      if (!ok) {
        dispatch({ type: ACTION_LIST_COLLECTIONS, status: STATUS_ERROR, error });
        return;
      }
      dispatch({ type: ACTION_LIST_COLLECTIONS, status: STATUS_OK, collections });
    })();
  }, []);

  const onReviewClick = async (collectionId) => {
    dispatch({ type: ACTION_START_SESSION, status: STATUS_PENDING });
    const { ok, session, error } = await network.post('/api/session', {
      collectionId,
    });
    if (!ok) {
      dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error });
      return;
    }
    history.push(`/play/${session.id}`);
  };

  const collections = state.get('collections');

  return (
    <div className="container my-collection-list-page">
      <section className="row">
        <div className="col">
          <h2>Collections</h2>
          {!(collections && collections.size) &&
          <p className="text-center">Loading...</p>
          }
          {!!(collections && collections.size) &&
          <div className="list-group list-group-flush">
            {collections.map(item => (
            <div key={item.get('id')} className="list-group-item">
              {item.get('title')}
              <div className="actions float-right">
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-sm btn-primary"
                    onClick={() => onReviewClick(item.get('id'))}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
          }
        </div>
      </section>
    </div>
  );
};
