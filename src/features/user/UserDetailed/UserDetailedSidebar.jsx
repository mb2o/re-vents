import { Button, Grid, Segment } from "semantic-ui-react";
import React from "react";

const UserDetailedSidebar = () => {
   return (
      <Grid.Column width={4}>
         <Segment>
            <Button basic color='teal' content='Edit Profile' fluid />
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedSidebar;
