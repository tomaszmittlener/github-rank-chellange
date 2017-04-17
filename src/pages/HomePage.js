import React from 'react';

//components
import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import PageTitle from '../components/PageTilte';
import ContributorsList from '../components/ContributorsList';

//redux
import { connect } from 'react-redux';

//redux actions
import {
  changeCurrentOwner,
  changePageStatus,
  addRepos,
  addRepoContributors,
  addContributorInfo,
  addFilterMaxValues
} from '../actions/actions';

//tools
import mapStateToProps from '../utils/mapStateToProps';

//services
import { getRepos, getContributors, getUserInfo } from '../services/getData';

//lodash
import map from 'lodash/map';


class HomePage extends React.Component {
  constructor() {
    super();
    this.ALERTS = {
      INITIAL_INFO: 'please wait',
      STAGE_ONE: 'downloading contributors',
      STAGE_TWO: 'downloading contributors info',
      SUCCESS: 'done'
    };
  }

  componentDidMount() {
    //This will initiate series of promises.
    //The order is important: get repos-> get contributors -> get additional info -> retrieve max values for filters
    if(!this.props.root.contributors.length > 0) {
      this._downloadData();
    }
  }

  _downloadData() {
    //Get Owner's (in this case Angulars) info
    getUserInfo()
      .then(ownerInfo=> {
        changeCurrentOwner(ownerInfo);
      });
    //Get all repositories and change status
    getRepos()
      .then(allRepos => {
        addRepos(allRepos);
        changePageStatus(this.ALERTS.STAGE_ONE);
        return allRepos;
      })
      //Get all contributors without duplicates -> get all contributors info -> retrieve max values for filters
      .then(allRepos => {this._getUniqueContributors(allRepos)});
  }

  _getUniqueContributors(allRepos) {
    const promiseUniqueContributors = map(allRepos, (repo) => {
      //Get contributors for each repo
      return getContributors(repo.name)
        .then(oneRepoContributors => {
          //creates non-duplicate list of contributors and additional list of all repos and contributors
          addRepoContributors(oneRepoContributors, repo.name);
        });
    });
    //When done, change status and get additional info about every contributor
    Promise.all(promiseUniqueContributors)
      .then(() => {
        changePageStatus(this.ALERTS.STAGE_TWO);
        return this.props.root.contributors})
      .then(this._getContributorsInfo.bind(this));
  }

  _getContributorsInfo(contributors) {
    const promiseAllInfo = map(contributors, (contributor) => {
      return getUserInfo(contributor.login)
        .then(contributorInfo => {
          addContributorInfo({...contributor, ...contributorInfo})
        })});
    //When done, retrieve max values for filters and change status
    Promise.all(promiseAllInfo)
      .then(()=> {this._getMaxValues()})
  }

  _getMaxValues() {
    addFilterMaxValues();
    changePageStatus(this.ALERTS.SUCCESS);
  }

  render() {
    let {
      filterContributionsMaxValue,
      filterFollowersMaxValue,
      filterReposMaxValue,
      filterGistsMaxValue
    } = this.props.root.filterMaxValues;

    let {
      currentOwner,
      contributors,
      pageStatus
    } = this.props.root;

    return (
      <Page className="page--homePage"
            pageTitle={
              pageStatus === 'done' ?
                `.../${currentOwner.login}/contributors_list` :
                `${pageStatus}...`}
            pageStatus={pageStatus}>

        <InfoPanel className="infoPanel--homePage"
                   person={currentOwner}/>

        <MainPanel className="mainPanel--homePage">

          <PageTitle>
            {pageStatus === 'done' ?
              `${currentOwner.login}'s top contributors:` :
              'loading...'}
          </PageTitle>

          <ContributorsList className="topContributorsList--homePage"
                            contributors={contributors}
                            filterContributionsMaxValue={filterContributionsMaxValue}
                            filterFollowersMaxValue={filterFollowersMaxValue}
                            filterReposMaxValue={filterReposMaxValue}
                            filterGistsMaxValue={filterGistsMaxValue}
                            pageStatus={pageStatus}
                            requireFilters={true}
                            requireDetails={true}/>
        </MainPanel>
      </Page>
    );
  }
}


export default connect(mapStateToProps)(HomePage);
