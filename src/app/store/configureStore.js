import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";

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
