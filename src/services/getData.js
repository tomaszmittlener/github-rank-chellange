import config from 'config'

// github authentication credentials. For client id, client secret and api host refer to relevant config file in ../config directory

const auth = `?&client_id=${config.id}&client_secret=${config.secret}`;

// data requests

function getUser(username) {
  return fetch(`${config.apiHost}/users/${username}${auth}`)
    .then(response => {
      return response.json();
    })
}

export { getUser };
