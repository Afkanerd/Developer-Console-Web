import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "reducers";
import rootMiddleware from "middleware";
import App from "./pages/App";

const store = createStore(rootReducer, rootMiddleware);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
