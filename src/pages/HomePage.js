import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

import { getRepos, getContributors } from '../services/getData';

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

    getRepos()
      .then(allRepos =>{
        this.setState({
          reposOwner: allRepos[0].owner.login,
          reposOwnerImage: allRepos[0].owner.avatar_url,
          reposOwnerType: allRepos[0].owner.type
        });
        this._getUniqueContributors(allRepos);

      });
  }

  _getUniqueContributors(allRepos) {

    _.forEach(allRepos, (repo) => {

      // get contributors for repo
      getContributors(repo.name)
        .then(contributorsRepo => {

          //get unique and duplicate contributors
          const _contributorsUniques = _.differenceBy(contributorsRepo, this.state.contributors, 'login');
          const _contributorsDuplicates = _.intersectionBy(contributorsRepo, this.state.contributors, 'login');

          //add contributions
          const _contributorsAddContributions = _.map(this.state.contributors, contributor => {
            const _duplicate = _.find(_contributorsDuplicates, duplicate => {
              return duplicate.login === contributor.login;
            });

            if(_duplicate) {
              return {...contributor, contributions: contributor.contributions + _duplicate.contributions}
            }else{
              return contributor
            }
          });

          //set state
          this.setState({
            contributors: [ ..._contributorsUniques, ..._contributorsAddContributions ]
          });
        })
    });
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
