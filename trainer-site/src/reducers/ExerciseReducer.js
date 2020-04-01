import { GET_EXERCISES, DELETE_EXERCISE, CREATE_EXERCISE } from '../actions/ExerciseActions';
const initialState = {
  exercises: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EXERCISES:
      return { ...state, exercises: payload };

    case CREATE_EXERCISE:
      return { ...state, exercises: [payload, ...state.exercises] };

    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter((exercise) => exercise.id !== payload),
      };

    default:
      return state;
  }
};
