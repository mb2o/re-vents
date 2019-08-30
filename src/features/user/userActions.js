import {
   asyncActionError,
   asyncActionFinish,
   asyncActionStart
} from "../async/asyncActions";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";

export const updateProfile = (user) => async (
   dispatch,
   getState,
   { getFirebase }
) => {
   const firebase = getFirebase();
   const { isLoaded, isEmpty, ...updatedUser } = user;

   try {
      await firebase.updateProfile(updatedUser); // updates profile in firestore!
      toastr.success("Success", "Your profile has been updated");
   } catch (error) {
      console.error(error);
   }
};

export const uploadProfileImage = (file, fileName) => async (
   dispatch,
   getState,
   { getFirebase, getFirestore }
) => {
   const imageName = cuid();
   const firebase = getFirebase();
   const firestore = getFirestore();
   const user = firebase.auth().currentUser;
   const path = `${user.uid}/user_images/`;
   const options = {
      name: imageName
   };

   try {
      dispatch(asyncActionStart);
      // upload file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of the image
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not update profile
      if (!userDoc.data().photoURL) {
         await firebase.updateProfile({
            photoURL: downloadURL
         });
         await user.updateProfile({
            photoURL: downloadURL
         });
      }
      // add image to firestore
      await firestore.add(
         {
            collection: "users",
            doc: user.uid,
            subcollections: [{ collection: "photos" }]
         },
         {
            name: imageName,
            url: downloadURL
         }
      );
      dispatch(asyncActionFinish());
   } catch (error) {
      console.error(error);
      dispatch(asyncActionError());
   }
};
