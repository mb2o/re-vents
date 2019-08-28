import { Button, Icon } from "semantic-ui-react";
import React from "react";

const SocialLogin = () => {
   return (
      <div>
         <Button
            color='facebook'
            fluid
            style={{ marginBottom: "10px" }}
            type='button'>
            <Icon name='facebook' /> Login with Facebook
         </Button>

         <Button color='google plus' fluid type='button'>
            <Icon name='google plus' />
            Login with Google
         </Button>
      </div>
   );
};

export default SocialLogin;
