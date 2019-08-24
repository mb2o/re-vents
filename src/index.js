import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

const rootEl = document.getElementById("root");

let render = () => {
   ReactDOM.render(
      <BrowserRouter>
         <App />
      </BrowserRouter>,
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
