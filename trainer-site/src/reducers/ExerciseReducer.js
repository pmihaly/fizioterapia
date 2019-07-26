import { GET_EXERCISES } from "../actions/ExerciseActions";
const initialState = {
  exercises: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EXERCISES:
      return { ...state, exercises: payload };

    default:
      return state;
  }
};
