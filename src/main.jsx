import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.jsx";
import { Provider } from "react-redux";
import ToastWrapper from "./Components/toast-wrapper/ToastWrapper";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ToastWrapper>
        <App />
      </ToastWrapper>
    </Provider>
  </>
);
