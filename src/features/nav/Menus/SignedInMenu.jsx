import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

const SignedInMenu = ({ signOut, currentUser }) => {
   return (
      <Menu.Item position='right'>
         <Image avatar spaced='right' src='/assets/user.png' />
         <Dropdown pointing='top left' text={currentUser}>
            <Dropdown.Menu>
               <Dropdown.Item icon='plus' text='Create Event' />
               <Dropdown.Item icon='calendar' text='My Events' />
               <Dropdown.Item icon='users' text='My Network' />
               <Dropdown.Item icon='user' text='My Profile' />
               <Dropdown.Item
                  as={Link}
                  icon='settings'
                  text='Settings'
                  to='/settings'
               />
               <Dropdown.Item icon='power' onClick={signOut} text='Sign Out' />
            </Dropdown.Menu>
         </Dropdown>
      </Menu.Item>
   );
};

export default SignedInMenu;
