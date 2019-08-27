import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import asyncReducer from "../../features/async/asyncReducer";
import authReducer from "../../features/auth/authReducer";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import testReducer from "../../features/testarea/testReducer";

const rootReducer = combineReducers({
   async: asyncReducer,
   auth: authReducer,
   events: eventReducer,
   firebase: firebaseReducer,
   firestore: firestoreReducer,
   form: FormReducer,
   modals: modalReducer,
   test: testReducer,
   toastr: ToastrReducer
});

export default rootReducer;
