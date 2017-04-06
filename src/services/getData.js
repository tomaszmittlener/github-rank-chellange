import config from 'config';
import isUndefined from 'lodash/isUndefined'


// Authentication credentials. For client id, client secret and api host refer to relevant config file in ../config directory

const auth = `?&client_id=${config.id}&client_secret=${config.secret}`;

//Error handlers

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }else{
    console.warn(`Service unavaible ${response.statusText}`); //eslint-disable-line
  }
}

function json(response) {
  return response.json();
}

const checkForErrors = (json) => {
  if(!isUndefined(json.message)) {
    throw new Error(`${json.message}`)
  } else {
    return json;
  }
};

//Data requests

function getUserInfo(userName) {
  return fetch(`${config.apiHost}/users/${userName}${auth}`)
    .then(status)
    .then(json)
    .then(checkForErrors)
}

function getUserRepos(userName) {
  return fetch(`${config.apiHost}/users/${userName}/repos${auth}`)
    .then(status)
    .then(json)
    .then(checkForErrors)
}

export { getUserInfo, getUserRepos };
