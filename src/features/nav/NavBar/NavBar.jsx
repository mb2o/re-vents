import { Button, Container, Menu } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import { withFirebase } from "react-redux-firebase";
import React, { Component, Fragment } from "react";

import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";

class NavBar extends Component {
   handleRegister = () => {
      this.props.openModal("RegisterModal");
   };

   handleSignIn = () => {
      this.props.openModal("LoginModal");
   };

   handleSignOut = () => {
      this.props.firebase.logout();
      this.props.history.push("/");
   };

   render() {
      const { auth } = this.props;
      const authenticated = auth.isLoaded && !auth.isEmpty;

      return (
         <Menu fixed='top' inverted>
            <Container>
               <Menu.Item as={NavLink} exact header to='/'>
                  <img alt='logo' src='/assets/logo.png' />
                  Re-vents
               </Menu.Item>
               <Menu.Item as={NavLink} exact name='Events' to='/events' />

               {authenticated && (
                  <Fragment>
                     <Menu.Item as={NavLink} name='People' to='/people' />
                     <Menu.Item as={NavLink} name='Test' to='/test' />
                     <Menu.Item>
                        <Button
                           as={Link}
                           content='Create Event'
                           floated='right'
                           inverted
                           positive
                           to='/createEvent'
                        />
                     </Menu.Item>
                  </Fragment>
               )}

               {authenticated ? (
                  <SignedInMenu auth={auth} signOut={this.handleSignOut} />
               ) : (
                  <SignedOutMenu
                     register={this.handleRegister}
                     signIn={this.handleSignIn}
                  />
               )}
            </Container>
         </Menu>
      );
   }
}

const mapStateToProps = (state) => ({
   auth: state.firebase.auth
});

const mapDispatchToProps = {
   openModal
};

export default withRouter(
   withFirebase(
      connect(
         mapStateToProps,
         mapDispatchToProps
      )(NavBar)
   )
);
