import axios from "axios";

export const CREATE_TRAINING = "CREATE_TRAINING";
export const GET_TRAININGS = "GET_TRAININGS";
export const UPDATE_TRAINING = "UPDATE_TRAINING";
export const DELETE_TRAINING = "DELETE_TRAINING";

const address = require("../../package.json").proxy;

export const getTrainings = userDetails => dispatch => {
  axios
    .get(`${address}/trainings`, {
      params: userDetails,
      headers: { "Content-Type": "application/json" }
    })
    .then(({ data }) => dispatch({ type: GET_TRAININGS, payload: data }));
};

export const deleteTraining = (userDetails, id) => dispatch => {
  axios
    .delete(`${address}/trainings/${id}`, {
      data: userDetails,
      headers: { "Content-Type": "application/json" }
    })
    .then(id => dispatch({ type: DELETE_TRAINING, payload: id }));
};
