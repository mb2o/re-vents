import { toastr } from "react-redux-toastr";

export const updateProfile = (user) => async (
   dispatch,
   getState,
   { getFirebase }
) => {
   const firebase = getFirebase();

   try {
      await firebase.updateProfile(user); // updates profile in firestore!
      toastr.success("Success", "Your profile has been updated");
   } catch (error) {
      console.error(error);
   }
};
