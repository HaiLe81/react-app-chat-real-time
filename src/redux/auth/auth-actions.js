import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./auth-types";

import { login, register } from "./auth-service";
import { setCookie } from "../cookie/cookie-service";
import { globals } from "../../configs";

// login
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

// register
export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};

// login
export const LoginUsers = (values) => async (dispatch) => {
  const { username, password } = values;
  dispatch(fetchUsersRequest);

  return new Promise((resolve, reject) => {
    login(username, password)
      .then((res) => {
        dispatch(fetchUsersSuccess(res.user, res.token));
        setCookie(globals.env.COOKIE_KEY, res.token);
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
};

// register
export const RegisterUser = (values) => async (dispatch) => {
  
  dispatch(registerRequest);

  return new Promise((resolve, reject) => {
    register(values)
      .then((res) => {
        dispatch(registerSuccess(res.user, res.token));
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(registerFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
};
