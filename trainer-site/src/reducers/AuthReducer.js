import {
  LOG_IN,
  REGISTER,
  LOG_IN_WITH_USER,
  LOG_OUT
} from "../actions/AuthActions";

const initialState = {
  authenticatedUser: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return { ...state, authenticatedUser: payload };

    case REGISTER:
      return { ...state, authenticatedUser: payload };

    case LOG_IN_WITH_USER:
      return { ...state, authenticatedUser: payload };

    case LOG_OUT:
      return { ...state, authenticatedUser: {} };

    default:
      return state;
  }
};
