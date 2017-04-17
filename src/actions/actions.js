// redux store
import store  from '../stores/store';

//Please read ./README.md for more details

function changeCurrentOwner(currentOwner) {
  store.dispatch({type: 'CHANGE_CURRENT_OWNER', currentOwner: currentOwner})
}
function addRepos(repos) {
  store.dispatch({type: 'ADD_REPOS', repos: repos})
}

function changePageStatus(pageStatus) {
  store.dispatch({type: 'CHANGE_PAGE_STATUS', pageStatus: pageStatus})
}

function addRepoContributors(contributors, repo) {
  store.dispatch({type: 'ADD_REPO_CONTRIBUTORS', contributors: contributors, repoName: repo})
}
function addContributorInfo(contributorInfo) {
  store.dispatch({type: 'ADD_CONTRIBUTOR_INFO', contributorWithInfo: contributorInfo})
}

function addFilterMaxValues() {
  store.dispatch({type: 'ADD_FILTER_MAX_VALUES'})
}


export {
  changeCurrentOwner,
  changePageStatus,
  addRepos,
  addRepoContributors,
  addContributorInfo,
  addFilterMaxValues
}
