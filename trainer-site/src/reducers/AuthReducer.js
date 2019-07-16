import { LOG_IN, REGISTER } from "../actions/AuthActions";

const initialState = {
  authenticatedUserDetails: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return { ...state, authenticatedUserDetails: payload };

    case REGISTER:
      return { ...state, authenticatedUserDetails: payload };

    default:
      return state;
  }
};
