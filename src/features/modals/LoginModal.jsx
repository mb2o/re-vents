import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import React, { Component } from "react";

import { closeModal } from "./modalActions";
import LoginForm from "../auth/Login/LoginForm";

const actions = { closeModal };

class LoginModal extends Component {
   render() {
      return (
         <Modal onClose={this.props.closeModal} open size='mini'>
            <Modal.Header>Login to Re-vents</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <LoginForm />
               </Modal.Description>
            </Modal.Content>
         </Modal>
      );
   }
}

export default connect(
   null,
   actions
)(LoginModal);
