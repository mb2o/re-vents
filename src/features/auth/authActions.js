import { LOGOUT_USER } from "./authConstants";
import { SubmissionError } from "redux-form";
import { closeModal } from "../modals/modalActions";

export const login = (creds) => {
   return async (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      try {
         await firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password);
         dispatch(closeModal());
      } catch (error) {
         console.error(error);
         throw new SubmissionError({
            _error: error.message
         });
      }
   };
};

export const logout = () => {
   return {
      type: LOGOUT_USER
   };
};
