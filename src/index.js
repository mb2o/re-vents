import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import App from "./app/layout/App";
import React from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import ScrollToTop from "./app/common/util/ScrollToTop";

import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const store = configureStore();

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

// rendering won't take place until our firebase authentication is ready
store.firebaseAuthIsReady.then(() => {
   render();
});

serviceWorker.unregister();
