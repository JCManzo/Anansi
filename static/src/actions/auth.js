import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../constants/index';

import { get_token, createUser } from '../utils/http_funcs';

export function registerUserRequest() {
  return {
      type: REGISTER_USER_REQUEST
  };
}

export function registerUser(email, password, username) {
  return function (dispatch) {
    dispatch(registerUserRequest);
    return createUser(email, password, username)
      .then();
  };
}
