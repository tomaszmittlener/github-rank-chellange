import config from 'config'

// github authentication credentials. For client id, client secret and api host refer to relevant config file in ../config directory

const auth = `?&client_id=${config.id}&client_secret=${config.secret}`;

// data requests

function getUserInfo(userName) {
  return fetch(`${config.apiHost}/users/${userName}${auth}`)
    .then(response => {
      return response.json();
    })
}

function getUserRepos(userName) {
  return fetch(`${config.apiHost}/users/${userName}/repos${auth}`)
    .then(response => {
      return response.json();
    })
}

export { getUserInfo, getUserRepos };
