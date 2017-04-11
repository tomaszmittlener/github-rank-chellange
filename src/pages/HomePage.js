import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

import { getRepos, getContributors, getUserInfo } from '../services/getData';

import _differenceBy from 'lodash/differenceBy';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _intersectionBy from 'lodash/intersectionBy';
import _map from 'lodash/map';
import _max from 'lodash/max';
import _sortBy from 'lodash/sortBy';


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      reposOwner: '',
      reposOwnerImage: '',
      reposOwnerType: '',
      contributors: [],
      usersInfo: [],
      filterContributionsMax: {},
      filterFollowersMax: {},
      filterReposMax: {},
      filterGistsMax: {}
    }
  }


  componentDidMount() {

    //this will initiate series of promises.
    // The order is important: get repos-> get contributors -> get additional info -> retrieve max values for filters
    this._downloadData();
  }


  _downloadData() {

    //get all repositories
    getRepos()
      .then(allRepos => {
        this.setState({
          allRepos: allRepos,
          reposOwner: allRepos[0].owner.login,
          reposOwnerImage: allRepos[0].owner.avatar_url,
          reposOwnerType: allRepos[0].owner.type
        });

        //get all contributors without duplicates -> get all contributors info -> retrieve max values for filters
        this._getUniqueContributors(this.state.allRepos);
      });
  }

  _getUniqueContributors(allRepos) {
    const promiseUniqueContributors = _map(allRepos, (repo) => {

      // get contributors for repo
      return getContributors(repo.name)
        .then(contributorsRepo => {

          //get unique and duplicate contributors
          const _contributorsUniques = _differenceBy(contributorsRepo, this.state.contributors, 'login');
          const _contributorsDuplicates = _intersectionBy(contributorsRepo, this.state.contributors, 'login');

          //add contributions
          const _contributorsAddContributions = _map(this.state.contributors, contributor => {
            const _duplicate = _find(_contributorsDuplicates, duplicate => {
              return duplicate.login === contributor.login;
            });
            return _duplicate ?
              {...contributor, contributions: contributor.contributions + _duplicate.contributions} :
              contributor
          });

          //set state
          this.setState({
            contributors: _sortBy([ ..._contributorsUniques,
              ..._contributorsAddContributions ], 'contributions').reverse()
          });
        });
    });

    //when done, get additional info about every contributor

    Promise.all(promiseUniqueContributors)
      .then(()=>{this._getContributorsInfo(this.state.contributors)})

  }




  _getContributorsInfo(contributorsCollection) {
    const promiseAllInfo = _map(contributorsCollection, (contributor) => {

      return getUserInfo(contributor.login)
        .then(contributorInfo => {

          const contributorWithAdditionalInfo =  {...contributor, ...contributorInfo};

          this.setState({
            contributors: _sortBy([..._filter(this.state.contributors,
              contributorToRemove => contributorToRemove.login !== contributor.login),
                contributorWithAdditionalInfo],
              'contributions').reverse()
          });
        })
    });

    //when done, retrieve highest number of contributions, followers, repos and gists for filters

    Promise.all(promiseAllInfo)
      .then(()=>{this._getMaxValues()})

  }

  _getMaxValues(){

    this.setState({

      filterContributionsMax:
        _max(this.state.contributors, contributor => {
          return contributor.contributions
        }),

      filterFollowersMax:
        _max(this.state.contributors, contributor => {
          return contributor.followers
        }),

      filterReposMax:
        _max(this.state.contributors, contributor => {
          return contributor.public_repos

        }),

      filterGistsMax:
        _max(this.state.contributors, contributor => {
          return contributor.public_gists
        })
    });

    //last task allerter
    console.warn('DONE!')

  }

  render() {
    let {
      reposOwner,
      reposOwnerImage,
      reposOwnerType,
      contributors,
      filterContributionsMax,
      filterFollowersMax,
      filterReposMax,
      filterGistsMax
    } = this.state;

    return (
      <Page className="page--homePage">
        <LeftPanel className="leftPanel--homePage"
                   image={reposOwnerImage}
                   title={reposOwner}
                   type={reposOwnerType} />
        <RightPanel className="rightPanel--homePage">
          <TopContributorsList className="topContributorsList--homePage"
                               contributors={contributors}
                               filterContributionsMax={filterContributionsMax}
                               filterFollowersMax={filterFollowersMax}
                               filterReposMax={filterReposMax}
                               filterGistsMax={filterGistsMax}
                               requireFilters={true}
                               requireDetails={true}/>
        </RightPanel>
      </Page>
    );
  }
}

HomePage.PropTypes = {
};

export default HomePage;
