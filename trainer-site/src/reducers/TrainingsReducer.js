import { GET_TRAININGS } from "../actions/TrainingActions";
const initialState = {
  trainings: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRAININGS:
      return { ...state, trainings: payload };

    default:
      return state;
  }
};
