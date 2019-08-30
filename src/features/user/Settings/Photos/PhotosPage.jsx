import { Button, Divider, Grid, Header, Segment } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
   deletePhoto,
   setMainPhoto,
   uploadProfileImage
} from "../../userActions";
import { firestoreConnect } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import CropperInput from "./CropperInput";
import DropzoneInput from "./DropzoneInput";
import React, { Fragment, useEffect, useState } from "react";
import UserPhotos from "./UserPhotos";

const query = ({ auth }) => {
   return [
      {
         collection: "users",
         doc: auth.uid,
         subcollections: [{ collection: "photos" }],
         storeAs: "photos"
      }
   ];
};

const mapStateToProps = (state) => ({
   auth: state.firebase.auth,
   profile: state.firebase.profile,
   photos: state.firestore.ordered.photos
});

const mapDispatchToProps = {
   uploadProfileImage,
   deletePhoto,
   setMainPhoto
};

const PhotosPage = ({
   uploadProfileImage,
   photos,
   profile,
   deletePhoto,
   setMainPhoto
}) => {
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

   const handleDeletePhoto = async (photo) => {
      try {
         await deletePhoto(photo);
      } catch (error) {
         toastr.error("Oops", error.message);
      }
   };

   const handleSetMainPhoto = async (photo) => {
      try {
         await setMainPhoto(photo);
      } catch (error) {
         console.error(error);
         toastr.error("Oops", error.message);
      }
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

         <UserPhotos
            deletePhoto={handleDeletePhoto}
            photos={photos}
            profile={profile}
            setMainPhoto={handleSetMainPhoto}
         />
      </Segment>
   );
};

export default compose(
   connect(
      mapStateToProps,
      mapDispatchToProps
   ),
   firestoreConnect((auth) => query(auth))
)(PhotosPage);
