import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";

import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
   auth: authReducer,
   form: FormReducer,
   test: testReducer,
   events: eventReducer,
   modals: modalReducer
});

export default rootReducer;
