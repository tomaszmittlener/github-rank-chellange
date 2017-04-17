//lodash
import differenceBy from 'lodash/differenceBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import intersectionBy from 'lodash/intersectionBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';

const defaultState = {
  repos: [],
  contributors: [],
  contributorsWithRepos: [],
  pageStatus: '',
  currentOwner: {},
  filterMaxValues: {}
};


const rootReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'ADD_REPOS':
      state = {...state, repos:  [...action.repos]};
      break;

    case 'ADD_REPO_CONTRIBUTORS':
      //get unique and duplicate contributors from all repos
      const _contributorsUniques = differenceBy(action.contributors, state.contributors, 'login');
      const _contributorsDuplicates = intersectionBy(action.contributors, state.contributors, 'login');
      //sum up each contributor's contributions
      const _contributorsAddContributions = map(state.contributors, contributor => {
        const _duplicate = find(_contributorsDuplicates, duplicate => {
          return duplicate.login === contributor.login;
        });
        return _duplicate ?
          { ...contributor, contributions: contributor.contributions + _duplicate.contributions} :
          contributor;
      });
      //create final, sorted list of contributors
      const contributors = sortBy([ ..._contributorsUniques, ..._contributorsAddContributions ], 'contributions').reverse();
      //create additional list of all repos and contributors to be used on UserPage and ReposPage
      const contributorsWithRepos =  map(action.contributors, (contributor) => {
        return {
          repo: action.repoName,
          contributor: contributor.login
        }
      });
      //add both lists to store
      state = {
        ...state,
        contributors: contributors,
        contributorsWithRepos: [...state.contributorsWithRepos, ...contributorsWithRepos]
      };
      break;

    case 'ADD_CONTRIBUTOR_INFO':
      const contributorsWithInfo = sortBy([ ...filter(state.contributors,
        contributorToRemove => contributorToRemove.login !== action.contributorWithInfo.login), action.contributorWithInfo ], 'contributions').reverse()
      state = {...state, contributors: contributorsWithInfo};
      break;

    case 'CHANGE_PAGE_STATUS':
      state = {...state, pageStatus: action.pageStatus};
      break;

    case 'CHANGE_CURRENT_OWNER':
      state = {...state, currentOwner: action.currentOwner};
      break;

    case 'ADD_FILTER_MAX_VALUES':
      //find contributors with highest amount of contributions, followers, repos and gists for filters
      const filterContributionsMaxContributor = maxBy(state.contributors, contributor => {
        return contributor.contributions
      });
      const filterFollowersMaxContributor = maxBy(state.contributors, contributor => {
        return contributor.followers
      });
      const filterReposMaxContributor = maxBy(state.contributors, contributor => {
        return contributor.public_repos

      });
      const filterGistsMaxContributor = maxBy(state.contributors, contributor => {
        return contributor.public_gists
      });
      //add max values to store and increase by one (to display max values)
      state = {...state,
        filterMaxValues: {
          filterContributionsMaxValue: filterContributionsMaxContributor.contributions + 1,
          filterFollowersMaxValue: filterFollowersMaxContributor.followers + 1,
          filterReposMaxValue: filterReposMaxContributor.public_repos + 1,
          filterGistsMaxValue: filterGistsMaxContributor.public_gists + 1
        }
      };
      break;

    default:
      return state;
  }
  return state
};

export { rootReducer }
