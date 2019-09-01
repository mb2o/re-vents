import { Grid, Header, Image, Segment } from "semantic-ui-react";
import LazyLoad from "react-lazyload";
import React from "react";

const UserDetailedPhotos = ({ photos }) => {
   return (
      <Grid.Column width={12}>
         <Segment attached>
            <Header content='Photos' icon='image' />
            <Image.Group size='small'>
               {photos &&
                  photos.map((photo) => (
                     <LazyLoad
                        height={150}
                        key={photo.id}
                        placeholder={<Image src='/assets/user.png' />}>
                        <Image src={photo.url} />
                     </LazyLoad>
                  ))}
            </Image.Group>
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedPhotos;
