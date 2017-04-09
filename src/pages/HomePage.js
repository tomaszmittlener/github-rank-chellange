import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

import { getRepos, getContributors, getUserInfo } from '../services/getData';

import _ from 'lodash'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      reposOwner: '',
      reposOwnerImage: '',
      reposOwnerType: '',
      contributors: [],
      usersInfo: []
    }
  }

  componentDidMount() {
    this._downloadData();
  }

  _downloadData() {

    //get all repositories
    getRepos()
      .then(allRepos => {
        this.setState({
          reposOwner: allRepos[0].owner.login,
          reposOwnerImage: allRepos[0].owner.avatar_url,
          reposOwnerType: allRepos[0].owner.type
        });

        //get unique contributors
        const promises = this._getUniqueContributors(allRepos);

        //THEN get info for unique contributors
        Promise.all(promises)
          .then(() => {
            this._getContributorsInfo(this.state.contributors)
          })

      });
  }

  _getUniqueContributors(allRepos) {
    return _.map(allRepos, (repo) => {

      // get contributors for repo
      return getContributors(repo.name)
        .then(contributorsRepo => {

          //get unique and duplicate contributors
          const _contributorsUniques = _.differenceBy(contributorsRepo, this.state.contributors, 'login');
          const _contributorsDuplicates = _.intersectionBy(contributorsRepo, this.state.contributors, 'login');

          //add contributions
          const _contributorsAddContributions = _.map(this.state.contributors, contributor => {
            const _duplicate = _.find(_contributorsDuplicates, duplicate => {
              return duplicate.login === contributor.login;
            });

            return _duplicate ?
              {...contributor, contributions: contributor.contributions + _duplicate.contributions} :
              contributor

          });

          //set state
          return this.setState({
            contributors: [ ..._contributorsUniques, ..._contributorsAddContributions ]
          })
        });
    })
  }

  _getContributorsInfo(contributorsCollection) {

    _.forEach(contributorsCollection, (contributor) => {
      getUserInfo(contributor.login)
        .then(contributorInfo => {

          const contributorWithAdditionalInfo =  {...contributor, ...contributorInfo};

          this.setState({
            contributors: [..._.filter(this.state.contributors, contributorToRemove => contributorToRemove.login !== contributor.login), contributorWithAdditionalInfo]
          })
        });
    })
  }


  render() {
    let { reposOwner, reposOwnerImage, reposOwnerType, contributors } = this.state;

    return (
      <Page className="page--homePage">
        <LeftPanel className="leftPanel--homePage"
                   image={reposOwnerImage}
                   title={reposOwner}
                   type={reposOwnerType} />
        <RightPanel className="rightPanel--homePage">
          <TopContributorsList className="topContributorsList--homePage"
                               contributors={contributors}/>
        </RightPanel>
      </Page>
    );
  }
}

HomePage.defaultProps = {
};

export default HomePage;
