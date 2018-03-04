import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../constants/index';

import { getToken, createUser } from '../utils/http_funcs';
import history from '../utils/history';

export function logOut() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  };
}

export function logOutAndRedirect() {
  return (dispatch) => {
    dispatch(logOut());
    history.push('/login');
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  };
}

export function loginUserSuccess(token) {
  // Save JWT
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  };
}

export function loginUserFailure(error) {
  // Remove JWT from client storage
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return getToken(email, password)
      .then((jsonResponse) => {
        dispatch(loginUserSuccess(jsonResponse.token));
        history.push('/home');
      })
      .catch((error) => {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid username or password'
          }
        }));
      });
  };
}

export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST
  };
}

export function registerUserSuccess(token) {
  // Store jwt locally.
  localStorage.setItem('token', token);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: { token }
  };
}

export function registerUserFailure(error) {
  // Remove jwt.
  localStorage.removeItem('token');
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function registerUser(email, username, password) {
  return function(dispatch) {
    dispatch(registerUserRequest());
    return createUser(email, username, password)
      .then((response) => {
        dispatch(registerUserSuccess(response.token));
        history.push('/home');
      })
      .catch((error) => {
        dispatch(registerUserFailure({
          response: {
            status: 403,
            statusText: 'User with that email or username already exists'
          }
        }));
      });
  };
}
