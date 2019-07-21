import axios from "axios";
import { REGISTRATION_ERROR, LOGIN_ERROR } from "./ErrorActions.js";

export const LOG_IN = "LOG_IN";
export const REGISTER = "REGISTER";
export const LOG_IN_WITH_USER = "LOG_IN_WITH_USER";
export const LOG_OUT = "LOG_OUT";

const address = require("../../package.json").proxy;

export const logIn = ({ email, password }) => dispatch => {
  axios
    .post(`${address}/auth`, {}, { auth: { username: email, password } })
    .then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: LOG_IN, payload: data });
    })
    .catch(err => dispatch({ type: LOGIN_ERROR, payload: true }));
};

export const register = userDetails => dispatch => {
  userDetails.role = "admin";
  axios
    .post(`${address}/users`, userDetails)
    .then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: REGISTER, payload: data });
    })
    .catch(err => dispatch({ type: REGISTRATION_ERROR, payload: true }));
};

export const setUser = payload => ({
  type: LOG_IN_WITH_USER,
  payload
});

export const logOut = () => dispatch => {
  localStorage.removeItem("user");
  dispatch({ type: LOG_OUT });
};
