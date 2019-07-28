import axios from "axios";

export const CREATE_EXERCISE = "CREATE_EXERCISE";
export const GET_EXERCISES = "GET_EXERCISES";
export const UPDATE_EXERCISE = "UPDATE_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";

const address = require("../../package.json").proxy;

export const getExercises = userDetails => dispatch => {
  axios
    .get(`${address}/exercises`, {
      params: userDetails,
      headers: { "Content-Type": "application/json" }
    })
    .then(({ data }) => dispatch({ type: GET_EXERCISES, payload: data }));
};
