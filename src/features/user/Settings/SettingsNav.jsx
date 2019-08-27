import { Header, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";

const SettingsNav = () => {
   return (
      <Fragment>
         <Menu vertical>
            <Header
               attached
               color='grey'
               content='Profile'
               icon='user'
               inverted
            />
            <Menu.Item as={NavLink} to='/settings/basic'>
               Basics
            </Menu.Item>
            <Menu.Item as={NavLink} to='/settings/about'>
               About Me
            </Menu.Item>
            <Menu.Item as={NavLink} to='/settings/photos'>
               My Photos
            </Menu.Item>
         </Menu>
         <Menu vertical>
            <Header
               attached
               color='grey'
               content='Account'
               icon='settings'
               inverted
            />
            <Menu.Item as={NavLink} to='/settings/account'>
               My Account
            </Menu.Item>
         </Menu>
      </Fragment>
   );
};

export default SettingsNav;
