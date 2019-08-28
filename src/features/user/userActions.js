import { toastr } from "react-redux-toastr";

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
