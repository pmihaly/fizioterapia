import axios from "axios";

export const LOG_IN = "LOG_IN";
export const REGISTER = "REGISTER";

const address = require("../../package.json").proxy;

export const logIn = ({ email, password }) => dispatch => {
  axios
    .post(`${address}/auth`, {}, { auth: { username: email, password } })
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOG_IN, payload: data });
    })
    .catch(err => console.log(err));
};

export const register = userDetails => dispatch => {
  axios
    .post(`${address}/users`, userDetails)
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
      dispatch({ type: REGISTER, payload: data });
    })
    .catch(err => console.log(err));
};
