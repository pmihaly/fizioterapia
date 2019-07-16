import { LOG_IN, REGISTER } from "../actions/AuthActions";

const initialState = {
  authenticatedUser: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return { ...state, authenticatedUser: payload };

    case REGISTER:
      return { ...state, authenticatedUser: payload };

    default:
      return state;
  }
};
