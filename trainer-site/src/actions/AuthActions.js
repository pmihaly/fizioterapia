export const LOG_IN = "LOG_IN";
export const REGISTER = "REGISTER";

export const logIn = userDetails => dispatch => {
  console.log("logging in...");
  fetch("/");
};

export const register = userDetails => dispatch => {
  console.log("registering...");
  fetch("/user", { method: "POST", body: userDetails })
    .then(res => res.json())
    .then(res => console.log(res));
};
