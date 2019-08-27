import { Button, Menu } from "semantic-ui-react";
import React from "react";

const SignedOutMenu = ({ signIn, register }) => {
   return (
      <Menu.Item position='right'>
         <Button basic content='Login' inverted onClick={signIn} />
         <Button
            basic
            content='Register'
            inverted
            onClick={register}
            style={{ marginLeft: "0.5em" }}
         />
      </Menu.Item>
   );
};

export default SignedOutMenu;
