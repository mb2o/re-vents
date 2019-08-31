import { Grid, Header, Image, Segment } from "semantic-ui-react";
import React from "react";

const UserDetailedPhotos = ({ photos }) => {
   return (
      <Grid.Column width={12}>
         <Segment attached>
            <Header content='Photos' icon='image' />
            <Image.Group size='small'>
               {photos &&
                  photos.map((photo) => (
                     <Image key={photo.id} src={photo.url} />
                  ))}
            </Image.Group>
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedPhotos;
