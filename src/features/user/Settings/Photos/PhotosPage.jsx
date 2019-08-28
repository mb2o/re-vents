import {
   Button,
   Card,
   Divider,
   Grid,
   Header,
   Image,
   Segment
} from "semantic-ui-react";
import CropperInput from "./CropperInput";
import DropzoneInput from "./DropzoneInput";
import React, { useEffect, useState } from "react";

const PhotosPage = () => {
   const [files, setFiles] = useState([]);
   const [image, setImage] = useState(null);

   useEffect(() => {
      return () => {
         files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
   }, [files]);

   return (
      <Segment>
         <Header content='Your Photos' dividing size='large' />
         <Grid>
            <Grid.Row />
            <Grid.Column width={4}>
               <Header color='teal' content='Step 1 - Add Photo' sub />
               <DropzoneInput setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
               <Header color='teal' content='Step 2 - Resize image' sub />
               {files.length > 0 && (
                  <CropperInput
                     imagePreview={files[0].preview}
                     setImage={setImage}
                  />
               )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
               <Header color='teal' content='Step 3 - Preview & Upload' sub />
               {files.length > 0 && (
                  <div
                     className='img-preview'
                     style={{
                        minHeight: "200px",
                        minWidth: "200px",
                        overflow: "hidden"
                     }}
                  />
               )}
            </Grid.Column>
         </Grid>

         <Divider />
         <Header color='teal' content='All Photos' sub />

         <Card.Group itemsPerRow={5}>
            <Card>
               <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
               <Button positive>Main Photo</Button>
            </Card>

            <Card>
               <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
               <div className='ui two buttons'>
                  <Button basic color='green'>
                     Main
                  </Button>
                  <Button basic color='red' icon='trash' />
               </div>
            </Card>
         </Card.Group>
      </Segment>
   );
};

export default PhotosPage;
