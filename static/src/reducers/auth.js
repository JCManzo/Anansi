import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../constants/index';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  isRegistering: false,
  isRegistered: false,
  registerStatusText: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return Object.assign({}, state, {
        isRegistering: true
      });
    case REGISTER_USER_SUCCESS:
      return Object.assign({}, state, {
        isRegistering: false,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        registerStatusText: 'You have been logged in successfully.'
      });
    case REGISTER_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        registerStatusText: action.payload.statusText
      });
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        isAuthenticated: false
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        statusText: 'You have successfully logged in.'
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        statusText: `${action.payload.statusText}`
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
        token: null,
        statusText: 'You have been successfully logged out.'
      });
    default:
      return state;
  }
}
