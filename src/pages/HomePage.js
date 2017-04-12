import React from 'react';

//components
import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import PageTitle from '../components/PageTilte';
import TopContributorsList from '../components/ContributorsList';

//tools
import { getRepos, getContributors, getUserInfo } from '../services/getData';

//lodash
import differenceBy from 'lodash/differenceBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import intersectionBy from 'lodash/intersectionBy';
import map from 'lodash/map';
import maxBy from 'lodash/maxBy';
import sortBy from 'lodash/sortBy';

class HomePage extends React.Component {
  constructor() {
    super();
    this.allerts = {
      initialInfo: 'please wait',
      stageOne: 'downloading contributors',
      stageTwo: 'downloading contributors info',
      success: 'done'
    };
    this.state = {
      repos: [],
      reposOwner: {},
      contributors: [],
      usersInfo: [],
      filterContributionsMax: {},
      filterFollowersMax: {},
      filterReposMax: {},
      filterGistsMax: {},
      pageStatus: this.allerts.initialInfo
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
      .then(ownerInfo=> {
          this.setState({
            reposOwner: ownerInfo
          })
        }
      );

    //get all repositories
    getRepos()
      .then(allRepos => {
        this.setState({
          allRepos: allRepos,
          pageStatus: this.allerts.stageOne
        });

        //get all contributors without duplicates -> get all contributors info -> retrieve max values for filters
        this._getUniqueContributors(this.state.allRepos);
      });
  }

  _getUniqueContributors(allRepos) {
    const promiseUniqueContributors = map(allRepos, (repo) => {
      // get contributors for repo
      return getContributors(repo.name)
        .then(contributorsRepo => {
          //get unique and duplicate contributors
          const _contributorsUniques = differenceBy(contributorsRepo, this.state.contributors, 'login');
          const _contributorsDuplicates = intersectionBy(contributorsRepo, this.state.contributors, 'login');

          //add contributions
          const _contributorsAddContributions = map(this.state.contributors, contributor => {
            const _duplicate = find(_contributorsDuplicates, duplicate => {
              return duplicate.login === contributor.login;
            });

            return _duplicate ?
              { ...contributor, contributions: contributor.contributions + _duplicate.contributions}
              :
              contributor
          });

          //set state
          this.setState({
            contributors: sortBy([ ..._contributorsUniques,
              ..._contributorsAddContributions ], 'contributions').reverse()
          });
        });
    });
    //when done, get additional info about every contributor
    Promise.all(promiseUniqueContributors)
      .then(() => {
        this.setState({
          pageStatus: this.allerts.stageTwo
        });
        this._getContributorsInfo(this.state.contributors)
      })
  }

  _getContributorsInfo(contributorsCollection) {
    const promiseAllInfo = map(contributorsCollection, (contributor) => {
      return getUserInfo(contributor.login)
        .then(contributorInfo => {
          const contributorWithAdditionalInfo =  { ...contributor, ...contributorInfo };

          this.setState({
            contributors: sortBy([ ...filter(this.state.contributors,
              contributorToRemove => contributorToRemove.login !== contributor.login),
                contributorWithAdditionalInfo ],
              'contributions')
              .reverse()
          });
        })
    });

    //when done, retrieve highest number of contributions, followers, repos and gists for filters
    Promise.all(promiseAllInfo)
      .then(()=> { this._getMaxValues() })
  }

  _getMaxValues(){
    this.setState({
      filterContributionsMax:
        maxBy(this.state.contributors, contributor => {
          return contributor.contributions
        }),

      filterFollowersMax:
        maxBy(this.state.contributors, contributor => {
          return contributor.followers
        }),

      filterReposMax:
        maxBy(this.state.contributors, contributor => {
          return contributor.public_repos

        }),

      filterGistsMax:
        maxBy(this.state.contributors, contributor => {
          return contributor.public_gists
        }),

      pageStatus: this.allerts.success
    });
  }

  render() {
    let {
      reposOwner,
      contributors,
      filterContributionsMax,
      filterFollowersMax,
      filterReposMax,
      filterGistsMax,
      pageStatus
    } = this.state;

    return (
      <Page className="page--homePage"
            pageTitle={
              pageStatus === 'done' ?
                `.../${reposOwner.login}/contributors_list`
                :
                `${pageStatus}...`
            }
            pageStatus={pageStatus}>
        <InfoPanel className="infoPanel--homePage"
                   person={reposOwner}/>

        <MainPanel className="mainPanel--homePage">
          <PageTitle>
            {
            pageStatus === 'done' ?
              '/top contributors'
              :
              'loading...'
          }
          </PageTitle>

          <TopContributorsList className="topContributorsList--homePage"
                               contributors={contributors}
                               filterContributionsMax={filterContributionsMax}
                               filterFollowersMax={filterFollowersMax}
                               filterReposMax={filterReposMax}
                               filterGistsMax={filterGistsMax}
                               pageStatus={pageStatus}
                               requireFilters={true}
                               requireDetails={true}/>
        </MainPanel>
      </Page>
    );
  }
}

export default HomePage;
