import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import firebase from "../config/firebase";
import rootReducer from "../reducers/rootReducer";

const rrfConfig = {
   userProfile: "users",
   attachAuthIsReady: true,
   useFirestoreForProfile: true
};

export const configureStore = () => {
   const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

   const composedEnhancer = composeWithDevTools(
      applyMiddleware(...middleware),
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
   );

   const store = createStore(rootReducer, composedEnhancer);

   return store;
};
