import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";

import asyncReducer from "../../features/async/asyncReducer";
import authReducer from "../../features/auth/authReducer";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import testReducer from "../../features/testarea/testReducer";

const rootReducer = combineReducers({
   async: asyncReducer,
   auth: authReducer,
   events: eventReducer,
   form: FormReducer,
   modals: modalReducer,
   test: testReducer,
   toastr: ToastrReducer
});

export default rootReducer;
