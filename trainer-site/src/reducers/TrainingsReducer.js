import { GET_TRAININGS, DELETE_TRAINING } from "../actions/TrainingActions";
const initialState = {
  trainings: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRAININGS:
      return { ...state, trainings: payload };

    case DELETE_TRAINING:
      return {
        ...state,
        trainings: state.trainings.filter(training => training.id !== payload)
      };

    default:
      return state;
  }
};
