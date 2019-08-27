import React, { Component, Fragment } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";

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
      this.props.logout();
      this.props.history.push("/");
   };

   render() {
      const { auth } = this.props;
      const authenticated = auth.authenticated;

      return (
         <Menu inverted fixed='top'>
            <Container>
               <Menu.Item as={NavLink} exact to='/' header>
                  <img src='/assets/logo.png' alt='logo' />
                  Re-vents
               </Menu.Item>
               <Menu.Item name='Events' exact as={NavLink} to='/events' />
               
               {authenticated && (
                  <Fragment>
                     <Menu.Item name='People' as={NavLink} to='/people' />
                     <Menu.Item name='Test' as={NavLink} to='/test' />
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
                  <SignedInMenu
                     signOut={this.handleSignOut}
                     currentUser={auth.currentUser}
                  />
               ) : (
                  <SignedOutMenu
                     signIn={this.handleSignIn}
                     register={this.handleRegister}
                  />
               )}
            </Container>
         </Menu>
      );
   }
}

const mapStateToProps = (state) => ({
   auth: state.auth
});

const mapDispatchToProps = {
   openModal,
   logout
};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(NavBar)
);
