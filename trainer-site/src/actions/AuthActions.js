import axios from "axios";

export const LOG_IN = "LOG_IN";
export const REGISTER = "REGISTER";

const address = require("../../package.json").proxy;

export const logIn = userDetails => dispatch => {
  axios
    .post(`${address}/auth`, {}, { auth: userDetails })
    .then(res => dispatch(res))
    .catch(err => console.log(err));
};

export const register = userDetails => dispatch => {
  axios
    .post(`${address}/users`, userDetails)
    .then(res => dispatch(res))
    .catch(err => console.log(err));
};
