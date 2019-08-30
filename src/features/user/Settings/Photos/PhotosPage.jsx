import {
   Button,
   Card,
   Divider,
   Grid,
   Header,
   Image,
   Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { uploadProfileImage } from "../../userActions";
import CropperInput from "./CropperInput";
import DropzoneInput from "./DropzoneInput";
import React, { useEffect, useState, Fragment } from "react";
import { toastr } from "react-redux-toastr";

const PhotosPage = ({ uploadProfileImage }) => {
   const [files, setFiles] = useState([]);
   const [image, setImage] = useState(null);

   useEffect(() => {
      return () => {
         files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
   }, [files]);

   const handleUploadImage = async () => {
      try {
         await uploadProfileImage(image, files[0].name);
         handleCancelCrop();
         toastr.success("Succes", "Photo has been uploaded");
      } catch (error) {
         console.error(error);
         toastr.error("Oops", error.message);
      }
   };

   const handleCancelCrop = () => {
      setFiles({});
      setImage(null);
   };

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
                  <Fragment>
                     <div
                        className='img-preview'
                        style={{
                           minHeight: "200px",
                           minWidth: "200px",
                           overflow: "hidden"
                        }}
                     />
                     <Button.Group>
                        <Button
                           icon='check'
                           onClick={handleUploadImage}
                           positive
                           style={{ width: "100px" }}
                        />
                        <Button
                           icon='close'
                           onClick={handleCancelCrop}
                           style={{ width: "100px" }}
                        />
                     </Button.Group>
                  </Fragment>
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

export default connect(
   null,
   { uploadProfileImage }
)(PhotosPage);
