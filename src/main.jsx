import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HashRouter } from "react-router";

import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>,
);
