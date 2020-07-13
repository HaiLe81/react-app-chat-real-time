import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_AUTH,
} from "./auth-types";

const initialState = {
  loading: false,
  token: null,
  isAuthorized: false,
  user: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      const { user, token } = action.payload;
      return {
        loading: false,
        token,
        isAuthorized: true,
        user: user,
        error: "",
      };
    case LOGIN_FAILURE:
      const error = action.payload;
      return {
        ...state,
        error,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return { ...state };
    case REGISTER_FAILURE:
      return {
        ...state,
      };
    case RESET_AUTH:
      return {
        loading: false,
        token: null,
        isAuthorized: false,
        user: [],
        error: "",
      };
    default:
      return state;
  }
};

export default reducer;
