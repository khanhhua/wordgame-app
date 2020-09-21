import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import network from "../components/network";
import {getCollections, getTermsByCollection} from '../components/github';
import {createSession} from '../components/session';
import {DispatchContext, StateContext} from "../components/context";
import {
  ACTION_CREATE_COLLECTION,
  ACTION_LIST_COLLECTIONS,
  ACTION_START_SESSION,
  STATUS_ERROR,
  STATUS_OK,
  STATUS_PENDING,
} from "../components/constants";
import CollectionList from "../components/CollectionList";

export default (props) => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const [newCollection, setNewCollection] = useState({visible: false, name: ''});
    const newCollectionNameRef = useRef();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const {ok, collections, myCollections, error} = await getCollections().then((collections) => ({
                collections,
                myCollections: [],
                ok: true,
                error: null,
            }));

            if (!ok) {
                if (error.status_code === 401) {
                    localStorage.clear();
                    history.replace('/login', {expired: true});
                    return;
                }

                dispatch({type: ACTION_LIST_COLLECTIONS, status: STATUS_ERROR, error});
                return;
            }

            dispatch({
                type: ACTION_LIST_COLLECTIONS, status: STATUS_OK,
                collections,
                myCollections,
            });
        })();
    }, [dispatch]);

    const onReviewClick = async (collection) => {
        dispatch({type: ACTION_START_SESSION, status: STATUS_PENDING});
        const terms = await getTermsByCollection({file: collection.get('file')});
        console.log({terms});
        // const { ok, session, error } = await network.post('/api/session', collection.get('is_owned') ?
        //         { collection_id: collection.get('id') } :
        //         { category_id: collection.get('id') }
        // );
        // if (!ok) {
        //   if (error.status_code === 401) {
        //     localStorage.clear();
        //     history.replace('/login', { expired: true });
        //     return;
        //   }
        //
        //   dispatch({ type: ACTION_START_SESSION, status: STATUS_ERROR, error });
        //   return;
        // }
        // dispatch({ type: ACTION_START_SESSION, status: STATUS_OK, session });

        const sessionId = await createSession(terms);
        history.push(`/play/${sessionId}`);
    };

    const onNewCollectionCreate = useCallback(async () => {
        const type = ACTION_CREATE_COLLECTION;
        dispatch({type, status: STATUS_PENDING});
        const {ok, collection, error} = await network.post('/api/me/collections', {
            name: newCollectionNameRef.current.value,
        });
        if (!ok) {
            if (error.status_code === 401) {
                localStorage.clear();
                history.replace('/login', {expired: true});
                return;
            }

            return dispatch({type, status: STATUS_ERROR, error});
        }

        dispatch({type, status: STATUS_OK, collection});
        setNewCollection({visible: false});
    }, [dispatch, newCollectionNameRef]);

    const onEditClick = useCallback(async (collection) => {
        history.push(`/collections/${collection.get('id')}`);
    }, [history]);

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
                                onClick={() => setNewCollection({visible: true})}
                                className="btn btn-sm btn-light mt-2 float-right"
                            >Add
                            </button>
                            <h2>My Learning List</h2>
                        </div>
                        <CollectionList
                            onEditClick={onEditClick}
                            collections={myCollections}
                            onReviewClick={onReviewClick}
                        />
                    </>
                    }
                    {!(collections && collections.size) &&
                    <p className="text-center">Loading...</p>
                    }
                    {!!(collections && collections.size) &&
                    <>
                        <h2 className="mt-5">Collections</h2>
                        <CollectionList collections={collections} onReviewClick={onReviewClick}/>
                    </>
                    }
                </div>
            </section>
            {!!newCollection.visible &&
            <Modal isOpen={newCollection.visible}>
                <ModalHeader toggle={() => setNewCollection({visible: false})}>New Collection</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input innerRef={newCollectionNameRef}/>
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
