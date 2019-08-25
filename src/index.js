import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import { configureStore } from "./app/store/configureStore";

const store = configureStore();
console.log(store.getState());

const rootEl = document.getElementById("root");

let render = () => {
   ReactDOM.render(
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>,
      rootEl
   );
};

// Hot Module Replacement (tip: refresh page on error)
if (module.hot) {
   module.hot.accept("./app/layout/App", () => {
      setTimeout(render);
   });
}

render();

serviceWorker.unregister();
