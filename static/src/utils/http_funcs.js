import { request } from './misc';

const server = 'http://127.0.0.1:5000';

export function createUser(email, username, password) {
  return request(`${server}/api/create_user`, {
    body: JSON.stringify({
      email,
      username,
      password
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
}

export function getToken(email, password) {
  return request(`${server}/api/get_token`, {
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
}

export function isTokenValid(token) {
  return request(`${server}/api/is_token_valid`, {
    body: JSON.stringify({ token }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
}
