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

export function uploadPhotos(files) {
  const token = localStorage.getItem('token');
  const data = new FormData();

  data.append('token', token);
  files.forEach((file) => {
    data.append('files[]', file);
  });

  return request(`${server}/api/photos`, {
    body: data,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'POST'
  });
}

export function getAllPhotos() {
  const token = localStorage.getItem('token');
  return request(`${server}/api/photos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
