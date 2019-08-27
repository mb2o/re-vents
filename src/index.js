import React from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./app/layout/App";
import ScrollToTop from "./app/common/util/ScrollToTop";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./app/store/configureStore";
import { loadEvents } from "./features/event/eventActions";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";

const store = configureStore();

// Load our events
store.dispatch(loadEvents());

const rootEl = document.getElementById("root");

let render = () => {
   ReactDOM.render(
      <Provider store={store}>
         <BrowserRouter>
            <ScrollToTop>
               <ReduxToastr
                  position='bottom-right'
                  transitionIn='fadeIn'
                  transitionOut='fadeOut'
               />
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
