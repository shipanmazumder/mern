import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import * as Types from "./store/actions/types"
const token = localStorage.getItem("auth_token");
if (token) {
  let decode = jwtDecode(token);
  store.dispatch({
    type:Types.SET_USER,
    payload:{
      user:decode
    }
  })
  setAuthToken(token)
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
