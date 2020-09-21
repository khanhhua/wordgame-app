import React from "react";
import { Modal, ModalBody } from "reactstrap";

export default () => (
  <Modal isOpen={true} contentClassName="bg-transparent border-0">
    <ModalBody>
      <div className="loader">Loading...</div>
    </ModalBody>
  </Modal>
);
