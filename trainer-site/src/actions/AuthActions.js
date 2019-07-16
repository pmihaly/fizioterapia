export const LOG_IN = "LOG_IN";
export const REGISTER = "REGISTER";

const address = require("../../package.json").proxy;

export const logIn = userDetails => dispatch => {
  console.log("logging in...");
  fetch("/");
};

export const register = userDetails => dispatch => {
  fetch(`${address}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails)
  })
    .then(res => res.json())
    .then(res => console.log(res));
};
