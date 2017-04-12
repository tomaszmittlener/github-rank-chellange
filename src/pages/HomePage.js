import React from 'react';
import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import TopContributorsList from '../components/ContributorsList';

import { getRepos, getContributors, getUserInfo } from '../services/getData';

import _differenceBy from 'lodash/differenceBy';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _intersectionBy from 'lodash/intersectionBy';
import _map from 'lodash/map';
import _maxBy from 'lodash/maxBy';
import _sortBy from 'lodash/sortBy';


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      reposOwner: {},
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

    //get repos Owners' info
    getUserInfo()
      .then( ownerInfo=>{
          this.setState({
            reposOwner: ownerInfo
          })
        }
      );

    //get all repositories
    getRepos()
      .then(allRepos => {
        this.setState({
          allRepos: allRepos
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
      .then(()=>{console.log('Downloaded all contributors');
        this._getContributorsInfo(this.state.contributors)})
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
      .then(()=>{console.log('Downloaded contributors info');
        this._getMaxValues()})
  }

  _getMaxValues(){

    this.setState({

      filterContributionsMax:
        _maxBy(this.state.contributors, contributor => {
          return contributor.contributions
        }),

      filterFollowersMax:
        _maxBy(this.state.contributors, contributor => {
          return contributor.followers
        }),

      filterReposMax:
        _maxBy(this.state.contributors, contributor => {
          return contributor.public_repos

        }),

      filterGistsMax:
        _maxBy(this.state.contributors, contributor => {
          return contributor.public_gists
        })
    });

    //last task allerter
    console.warn('DONE!')
  }

  render() {
    let {
      reposOwner,
      contributors,
      filterContributionsMax,
      filterFollowersMax,
      filterReposMax,
      filterGistsMax
    } = this.state;

    return (
      <Page className="page--homePage"
            status={typeof filterGistsMax.public_gists === 'number'?
              `/${reposOwner.login}/contributors_lis` :
              'fetching data....'}>
        <InfoPanel className="infoPanel--homePage"
                   person={reposOwner}/>
        <MainPanel className="mainPanel--homePage">
          <TopContributorsList className="topContributorsList--homePage"
                               contributors={contributors}
                               filterContributionsMax={filterContributionsMax}
                               filterFollowersMax={filterFollowersMax}
                               filterReposMax={filterReposMax}
                               filterGistsMax={filterGistsMax}
                               requireFilters={true}
                               requireDetails={true}/>
        </MainPanel>
      </Page>
    );
  }
}

HomePage.PropTypes = {
};

export default HomePage;
