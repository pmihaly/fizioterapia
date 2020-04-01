import axios from 'axios';

export const CREATE_TRAINING = 'CREATE_TRAINING';
export const GET_TRAININGS = 'GET_TRAININGS';
export const UPDATE_TRAINING = 'UPDATE_TRAINING';
export const DELETE_TRAINING = 'DELETE_TRAINING';

const address = require('../../package.json').proxy;

export const getTrainings = (access_token) => (dispatch) => {
  axios
    .get(`${address}/trainings`, {
      params: { access_token },
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => dispatch({ type: GET_TRAININGS, payload: data }));
};

export const createTraining = (access_token, training) => (dispatch) => {
  axios.post(
    `${address}/address`,
    { access_token, ...training },
    { headers: { 'Content-Type': 'application/json' } }.then(({ data }) =>
      dispatch({ type: CREATE_TRAINING, payload: data })
    )
  );
};

export const deleteTraining = (access_token, id) => (dispatch) => {
  axios
    .delete(`${address}/trainings/${id}`, {
      data: { access_token },
      headers: { 'Content-Type': 'application/json' },
    })
    .then((id) => dispatch({ type: DELETE_TRAINING, payload: id }));
};
