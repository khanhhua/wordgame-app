import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
import {useHistory, useParams} from 'react-router-dom';
import {default as _debounce} from 'lodash.debounce';
import network, {debounce} from './network';
import {ACTION_ADD_TO_COLLECTION, STATUS_ERROR, STATUS_PENDING} from './constants';
import {DispatchContext} from './context';

const debouncedNetwork = debounce(1);

const debouncedSearch = _debounce((inputValue, callback) => {
    network.get(`/api/search?q=${inputValue}`).then(({ok, terms, error}) => {
        if (!ok) {
            if (error.status_code === 401) {
                localStorage.clear();
                window.history.replaceState({expired: true}, null, '/login');
                return;
            }

            return [];
        }
        callback(terms.map(({id, word}) => ({value: id, label: word})));
    });
}, 1000, {
    leading: false,
    trailing: true,
});

export default () => {
    const dispatch = useContext(DispatchContext);
    const history = useHistory();
    const {collectionId = null} = useParams();
    const [status, setStatus] = useState({busy: false, error: null});
    const [collection, setCollection] = useState({});
    const [query, setQuery] = useState('');
    const [shownCount, setShownCount] = useState(10);

    const onCloseClick = useCallback(() => {
        history.replace('/collections');
    }, [history]);
    const onEditCollectionNameChanged = useCallback(async ({target: {value}}) => {
        setCollection({
            ...collection,
            name: value,
        });

        const p = debouncedNetwork.patch(`/api/me/collections/${collectionId}`, {
            name: value,
        });
        if (p) {
            const {ok, error} = await p;
            if (!ok) {
                if (error.status_code === 401) {
                    localStorage.clear();
                    history.replace('/login', {expired: true});
                    return;
                }
            }
        }
    }, [collection]);

    const onNewTermSelected = useCallback(async (choice, {action}) => {
        if (action !== 'select-option') {
            return;
        }
        const type = ACTION_ADD_TO_COLLECTION;
        dispatch({type, status: STATUS_PENDING});

        const {ok, error} = await network.post(`/api/me/collections/${collectionId}/terms`, {
            term_id: choice.value,
        });

        if (!ok) {
            if (error.status_code === 401) {
                localStorage.clear();
                history.replace('/login', {expired: true});
                return;
            }
            return dispatch({type, status: STATUS_ERROR, error});
        }

        setCollection({
            ...collection,
            terms: [{id: choice.value, word: choice.label}, ...(collection.terms || [])],
        });
    }, [collection]);

    const onTermRemoved = useCallback(async (termId) => {
        const {ok, error} = await network.delete(`/api/me/collections/${collectionId}/terms/${termId}`);
        if (!ok) {
            if (error.status_code === 401) {
                localStorage.clear();
                history.replace('/login', {expired: true});
                return;
            }

            return;
        }

        setCollection({
            ...collection,
            terms: collection.terms.filter(({id: key}) => key !== termId)
        }, [collection]);
    }, [collection]);

    useEffect(() => {
        setStatus({busy: true});
        (async () => {
            const {ok, error, collection: _c} = await network.get(`/api/me/collections/${collectionId}`);
            if (!ok) {
                if (error.status_code === 401) {
                    localStorage.clear();
                    history.replace('/login', {expired: true});
                    return;
                }

                return;
            }

            setStatus({busy: false});
            setCollection(_c);
        })();
    }, [collectionId]);

    return (
        <Modal isOpen={true}>
            <ModalHeader toggle={onCloseClick}>Edit Collection</ModalHeader>
            <ModalBody>
                {status.busy &&
                <div className="loader loader-dark">Loading...</div>
                }
                {!status.busy &&
                <Form>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            value={collection.name}
                            onChange={onEditCollectionNameChanged}
                        />
                    </FormGroup>
                    <FormGroup>
                        <AsyncSelect
                            placeholder='Enter your new word...'
                            value={query}
                            onInputChange={(value) => setQuery(value)}
                            onChange={onNewTermSelected}
                            loadOptions={debouncedSearch}
                        />
                        <ListGroup flush>
                            {(collection.terms || []).slice(0, shownCount).map(item => (
                                <ListGroupItem key={item.id}>
                                    {item.word}
                                    <Button
                                        size="sm" color="link"
                                        className="float-right"
                                        onClick={() => onTermRemoved(item.id)}
                                    >&times;</Button>
                                </ListGroupItem>
                            ))}
                            {collection.terms && shownCount < collection.terms.length &&
                            <ListGroupItem>
                                <Button
                                    color="link"
                                    block
                                    onClick={() => setShownCount(shownCount * 2)}
                                >Show more >></Button>
                            </ListGroupItem>
                            }
                        </ListGroup>
                    </FormGroup>
                </Form>
                }
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onCloseClick}
                    color="light"
                >Close</Button>
            </ModalFooter>
        </Modal>
    );
};
