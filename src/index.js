import React from "react";
import ReactDOM from "react-dom";

import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

const rootEl = document.getElementById("root");

let render = () => {
   ReactDOM.render(<App />, rootEl);
};

// Hot Module Replacement (tip: refresh page on error)
if (module.hot) {
   module.hot.accept("./app/layout/App", () => {
      setTimeout(render);
   });
}

render();

serviceWorker.unregister();
