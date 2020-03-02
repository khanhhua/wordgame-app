import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import network from "../components/network";
import { DispatchContext, StateContext } from "../components/context";
import {
  ACTION_LIST_COLLECTIONS,
  ACTION_START_SESSION,
  ACTION_CREATE_COLLECTION,
  STATUS_ERROR,
  STATUS_OK,
  STATUS_PENDING,
} from "../components/constants";
import CollectionList from "../components/CollectionList";

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [newCollection, setNewCollection] = useState({ visible: false, name: '' });
  const newCollectionNameRef = useRef();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { ok, collections, myCollections, error } = await Promise.all([
          network.get('/api/collections'),
          network.get('/api/me/collections'),
      ]).then(([{ ok: _ok1, collections }, { ok: _ok2, collections: myCollections }]) => {
        // NOTE: We are being tolerant here.
        return {
          ok: _ok1 || _ok2,
          collections,
          myCollections,
        }}
      ).catch(error => ({
        ok: false,
        error,
      }));

      if (!ok) {
        dispatch({ type: ACTION_LIST_COLLECTIONS, status: STATUS_ERROR, error });
        return;
      }

      dispatch({ type: ACTION_LIST_COLLECTIONS, status: STATUS_OK,
        collections,
        myCollections,
      });
    })();
  }, []);

  const onReviewClick = async (collection) => {
    dispatch({ type: ACTION_START_SESSION, status: STATUS_PENDING });
    const { ok, session, error } = await network.post('/api/session', collection.get('is_owned') ?
            { collection_id: collection.get('id') } :
            { category_id: collection.get('id') }
    );
    if (!ok) {
      dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error });
      return;
    }
    dispatch({ type: ACTION_START_SESSION, status: STATUS_OK, session });
    history.push(`/play/${session.id}`);
  };

  const onNewCollectionCreate = useCallback(async () => {
    const type = ACTION_CREATE_COLLECTION;
    dispatch({ type, status: STATUS_PENDING });
    const { ok, collection, error } = await network.post('/api/me/collections', {
      name: newCollectionNameRef.current.value,
    });
    if (!ok) {
      return dispatch({ type, status: STATUS_ERROR, error });
    }

    dispatch({ type, status: STATUS_OK, collection });
    setNewCollection({ visible: false });
  }, [dispatch, newCollectionNameRef]);

  const collections = state.get('collections');
  const myCollections = state.get('myCollections');

  return (
    <div className="container my-collection-list-page">
      <section className="row">
        <div className="col">
          {!!(myCollections && myCollections.size) &&
          <>
            <div className="w-100">
              <button
                onClick={() => setNewCollection({ visible: true })}
                className="btn btn-sm btn-light mt-2 float-right"
              >Add</button>
              <h2>My Learning List</h2>
            </div>
            <CollectionList collections={myCollections} onReviewClick={onReviewClick} />
          </>
          }
          {!(collections && collections.size) &&
          <p className="text-center">Loading...</p>
          }
          {!!(collections && collections.size) &&
          <>
            <h2 className="mt-5">Collections</h2>
            <CollectionList collections={collections} onReviewClick={onReviewClick} />
          </>
          }
        </div>
      </section>
      {!!newCollection.visible &&
      <Modal isOpen={newCollection.visible}>
        <ModalHeader toggle={() => setNewCollection({ visible: false })}>New Collection</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input innerRef={newCollectionNameRef} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onNewCollectionCreate}
            color="primary"
          >Create</Button>
        </ModalFooter>
      </Modal>
      }
    </div>
  );
};
