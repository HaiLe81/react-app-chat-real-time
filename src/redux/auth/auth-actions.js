import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./auth-types";

import { login } from "./auth-service";
import { setCookie } from "../cookie/cookie-service";
import { globals } from "../../configs"

export const fetchUsersRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const fetchUsersSuccess = (user, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user, token },
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const LoginUsers = (values) => async (dispatch) => {
  const { username, password } = values;
  dispatch(fetchUsersRequest);
  // UserService.
  return new Promise((resolve, reject) => {
    login(username, password)
    .then((res) => {
      dispatch(fetchUsersSuccess(res.user, res.token));
      setCookie(globals.env.COOKIE_KEY, res.token)
      resolve({status: res.status, message: res.message})
    })
    .catch((err) => {
      dispatch(fetchUsersFailure(err));
      reject({ status: err.status, message: err.message })
    })
  })
};
