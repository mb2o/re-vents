import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";

export const configureStore = () => {
   const middleware = [thunk];

   const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));

   const store = createStore(rootReducer, composedEnhancer);

   return store;
};
