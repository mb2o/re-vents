import { Grid, Header, Icon, Item, List, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import React from "react";

const UserDetailedDescription = ({ profile }) => {
   let createdAt;
   if (profile.createdAt) {
      createdAt = format(profile.createdAt.toDate(), "d MMM yyyy");
   }

   return (
      <Grid.Column width={12}>
         <Segment>
            <Grid columns={2}>
               <Grid.Column width={10}>
                  <Header content='About Display Name' icon='smile' />
                  <p>
                     I am a: <strong>{profile.occupation || "btn"}</strong>
                  </p>
                  <p>
                     Originally from <strong>{profile.origin || "tbn"}</strong>
                  </p>
                  <p>
                     Member Since: <strong>{createdAt}</strong>
                  </p>
                  <p>{profile.description}</p>
               </Grid.Column>
               <Grid.Column width={6}>
                  <Header content='Interests' icon='heart outline' />
                  {profile.interests ? (
                     <List>
                        {profile.interests &&
                           profile.interests.map((interest, index) => (
                              <Item key={index}>
                                 <Icon name='heart' />
                                 <Item.Content>{interest}</Item.Content>
                              </Item>
                           ))}
                     </List>
                  ) : (
                     <p>No interests</p>
                  )}
               </Grid.Column>
            </Grid>
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedDescription;
