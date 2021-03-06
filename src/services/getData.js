import config from 'config';

//lodash
import isUndefined from 'lodash/isUndefined';

// Authentication credentials. For client id, client secret and api host refer to relevant config file in ../config directory
const amountPerPage = '30';
const auth = `?&client_id=${config.id}&client_secret=${config.secret}`;
const defaultName = 'angular';
const pagesNumber = `&page=1&per_page=${amountPerPage}`;

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
function getUserInfo(userName = defaultName) {
  return fetch(`${config.apiHost}users/${userName}${auth}`)
    .then(status)
    .then(json)
    .then(checkForErrors)
}

function getRepos(userName = defaultName) {
  return fetch(`${config.apiHost}users/${userName}/repos${auth}${pagesNumber}`)
    .then(status)
    .then(json)
    .then(checkForErrors)
}

function getContributors(repoName, userName = defaultName) {
  return fetch(`${config.apiHost}repos/${userName}/${repoName}/contributors${auth}${pagesNumber}`)
    .then(status)
    .then(json)
    .then(checkForErrors)
}

function getRepoInfo(repoName, userName) {
  return fetch(`${config.apiHost}repos/${userName}/${repoName}${auth}`)
    .then(status)
    .then(json)
    .then(checkForErrors)
}

export { getUserInfo, getRepos, getContributors, getRepoInfo };
