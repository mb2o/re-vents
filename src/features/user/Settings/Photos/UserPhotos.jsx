import { Button, Card, Header, Image } from "semantic-ui-react";
import React, { Fragment } from "react";

const UserPhotos = ({ photos, profile, deletePhoto, setMainPhoto }) => {
   let filteredPhotos;

   if (photos) {
      filteredPhotos = photos.filter((photo) => {
         return photo.url !== profile.photoURL;
      });
   }

   return (
      <Fragment>
         <Header color='teal' content='All Photos' sub />

         <Card.Group itemsPerRow={5}>
            <Card>
               <Image src={profile.photoURL} />
               <Button positive>Main Photo</Button>
            </Card>

            {photos &&
               filteredPhotos.map((photo) => (
                  <Card key={photo.id}>
                     <Image src={photo.url} />
                     <div className='ui two buttons'>
                        <Button
                           basic
                           color='green'
                           onClick={() => setMainPhoto(photo)}>
                           Main
                        </Button>
                        <Button
                           basic
                           color='red'
                           icon='trash'
                           onClick={() => deletePhoto(photo)}
                        />
                     </div>
                  </Card>
               ))}
         </Card.Group>
      </Fragment>
   );
};

export default UserPhotos;
