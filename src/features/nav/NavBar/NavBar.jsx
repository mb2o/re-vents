import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";

import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";

class NavBar extends Component {
   state = {
      authenticated: false
   };

   handleSignIn = () => this.setState({ authenticated: true });
   handleSignOut = () => {
      this.setState({ authenticated: false });
      this.props.history.push("/");
   };

   render() {
      const { authenticated } = this.state;

      return (
         <Menu inverted fixed='top'>
            <Container>
               <Menu.Item as={NavLink} exact to='/' header>
                  <img src='/assets/logo.png' alt='logo' />
                  Re-vents
               </Menu.Item>
               <Menu.Item name='Events' as={NavLink} to='/events' />
               <Menu.Item name='People' as={NavLink} to='/people' />
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
               {authenticated ? (
                  <SignedInMenu signOut={this.handleSignOut} />
               ) : (
                  <SignedOutMenu signIn={this.handleSignIn} />
               )}
            </Container>
         </Menu>
      );
   }
}

export default withRouter(NavBar);
