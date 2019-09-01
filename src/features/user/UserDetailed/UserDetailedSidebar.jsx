import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

const UserDetailedSidebar = ({ isCurrentUser }) => {
   return (
      <Grid.Column width={4}>
         <Segment>
            {isCurrentUser ? (
               <Button
                  as={Link}
                  basic
                  color='teal'
                  content='Edit Profile'
                  fluid
                  to='/settings'
               />
            ) : (
               <Button basic color='teal' content='Follow User' fluid />
            )}
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedSidebar;
