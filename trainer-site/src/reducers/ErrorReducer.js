import { REGISTRATION_ERROR, LOGIN_ERROR } from "actions/ErrorActions";

const initialState = {
  loginError: false,
  registrationError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_ERROR:
      return { ...state, loginError: payload };

    case REGISTRATION_ERROR:
      return { ...state, registrationError: payload };

    default:
      return state;
  }
};
