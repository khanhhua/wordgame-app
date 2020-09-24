import React, { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from './context';
import { useHistory } from 'react-router-dom';
import { ACTION_LIST_COLLECTIONS, STATUS_ERROR, STATUS_OK } from './constants';
import network from './network';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

export default ({ term, addToCollection }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const type = ACTION_LIST_COLLECTIONS;
      const { ok, collections, error } = await network.get(
        '/api/me/collections'
      );

      if (!ok) {
        if (error.status_code === 401) {
          localStorage.clear();
          history.replace('/login', { expired: true });
          return;
        }

        dispatch({ type, status: STATUS_ERROR, error });
        return;
      }
      dispatch({ type, status: STATUS_OK, collections });
    })();
  }, [dispatch]);

  return (
    <Modal isOpen={true}>
      <ModalHeader>Add '{term.get('word')}' to collection...</ModalHeader>
      <ModalBody>
        <FormGroup row>
          <Label className="col-form-label col-2">Collection</Label>
          <div className="col-10">
            <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
              <DropdownToggle
                caret
                className="bg-transparent text-black-50 w-100"
              >
                Choose a collection...
              </DropdownToggle>
              <DropdownMenu className="w-100">
                {state.get('collections').map((item) => (
                  <DropdownItem
                    key={item.get('id')}
                    onClick={() => addToCollection(item.get('id'))}
                  >
                    {item.get('name')}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </FormGroup>
      </ModalBody>
    </Modal>
  );
};
