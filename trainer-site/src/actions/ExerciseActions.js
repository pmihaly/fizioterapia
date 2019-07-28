import axios from "axios";

export const CREATE_EXERCISE = "CREATE_EXERCISE";
export const GET_EXERCISES = "GET_EXERCISES";
export const UPDATE_EXERCISE = "UPDATE_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";

const address = require("../../package.json").proxy;

export const getExercises = access_token => dispatch => {
  axios
    .get(`${address}/exercises`, {
      params: { access_token },
      headers: { "Content-Type": "application/json" }
    })
    .then(({ data }) => dispatch({ type: GET_EXERCISES, payload: data }));
};

export const deleteExercise = (access_token, id) => dispatch => {
  axios
    .delete(`${address}/exercises/${id}`, {
      data: { access_token },
      headers: { "Content-Type": "application/json" }
    })
    .then(id => dispatch({ type: DELETE_EXERCISE, payload: id }));
};
