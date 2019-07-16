import axios from "axios";

export const LOG_IN = "LOG_IN";
export const REGISTER = "REGISTER";

const address = require("../../package.json").proxy;

export const logIn = userDetails => dispatch => {
  fetch();
};

export const register = userDetails => dispatch => {
  // fetch(`${address}/users`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(userDetails)
  // })
  //   .then(res => res.json())
  //   .then(res => dispatch(res));
  console.log("jkj");
  axios
    .post(`${address}/users`, userDetails)
    .then(res => {
      console.log(res);
      dispatch(res);
    })
    .catch(err => console.log(err));
};
