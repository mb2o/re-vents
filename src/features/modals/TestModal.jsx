import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import React from "react";

import { closeModal } from "../modals/modalActions";

const TestModal = ({ closeModal }) => {
   return (
      <Modal closeIcon='close' onClose={closeModal} open>
         <Modal.Header>Test Modal</Modal.Header>
         <Modal.Content>
            <Modal.Description>
               <p>Test Modal... nothing to see here</p>
            </Modal.Description>
         </Modal.Content>
      </Modal>
   );
};

const mapDispatchToProps = {
   closeModal
};

export default connect(
   null,
   mapDispatchToProps
)(TestModal);
