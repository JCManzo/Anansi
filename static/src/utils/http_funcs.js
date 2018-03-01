
export function createUser(email, password, username) {
  fetch('/api/create_user', {
    method: 'POST',
    body: {
      email,
      password,
      username
    },
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
}

export function getToken(email, password, username) {
  return fetch('/api/get_token', {
    email,
    password,
    username
  });
}
