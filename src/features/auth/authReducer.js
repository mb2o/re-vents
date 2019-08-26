import { LOGIN_USER, LOGOUT_USER } from "./authConstants";
import { createReducer } from "../../app/common/util/reducerUtils";
import { login } from "./authActions";

const initialState = {
   authenticated: false,
   currentUser: null
};

const loginUser = (state, payload) => {
   return {
      authenticated: true,
      currentUser: payload.credentials.email
   };
};

const logoutUser = () => {
   return {
      authenticated: false,
      currentUser: null
   };
};

export default createReducer(initialState, {
   [LOGIN_USER]: loginUser,
   [LOGOUT_USER]: logoutUser
});
