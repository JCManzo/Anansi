import { request } from './misc';
import { SERVER_ADDRESS } from '../constants/index'


export function createUser(email, username, password) {
  return request(`${SERVER_ADDRESS}/api/create_user`, {
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
  return request(`${SERVER_ADDRESS}/api/get_token`, {
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
  return request(`${SERVER_ADDRESS}/api/is_token_valid`, {
    body: JSON.stringify({ token }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
}

export function uploadPhotos(files) {
  const token = localStorage.getItem('token');
  const data = new FormData();

  data.append('token', token);
  files.forEach((file) => {
    data.append('files[]', file);
  });

  return request(`${SERVER_ADDRESS}/api/photos`, {
    body: data,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'POST'
  });
}

export function fetchPhotos(userId = null) {
  const token = localStorage.getItem('token');
  return request(`${SERVER_ADDRESS}/api/photos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
