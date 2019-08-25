import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/layout/App";
import ScrollToTop from "./app/common/util/ScrollToTop";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./app/store/configureStore";

import "./index.css";

const store = configureStore();

const rootEl = document.getElementById("root");

let render = () => {
   ReactDOM.render(
      <Provider store={store}>
         <BrowserRouter>
            <ScrollToTop>
               <App />
            </ScrollToTop>
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
