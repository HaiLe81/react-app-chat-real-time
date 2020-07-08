import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./auth-types";

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
    default:
      return state;
  }
};

export default reducer;
