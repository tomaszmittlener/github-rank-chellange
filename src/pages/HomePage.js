import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

import { getRepos, getContributors, getUserInfo } from '../services/getData';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
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
      contributorsDuplicates: [],
      usersInfo: []
    }
  }


  componentDidMount() {
    this._downloadData();
  }

  _downloadData() {
    //reposcollection do getunique contributors i z tego korzystać
    getRepos()
      .then(collectionReposAll =>{
        this.setState({
          // repos: reposCollection,
          reposOwner: collectionReposAll[0].owner.login,
          reposOwnerImage: collectionReposAll[0].owner.avatar_url,
          reposOwnerType: collectionReposAll[0].owner.type
        });
        this._getUniqueContributors(collectionReposAll);

      });
  }

  _getUniqueContributors(collectionReposAll) {

    _.forEach(collectionReposAll, (repo) => {

      getContributors(repo.name)
        .then(collectionContributorsRepo => {

          //get unique and duplicate contributors
          const collectionContributorsUniques = _.differenceBy(collectionContributorsRepo, this.state.contributors, 'login');
          const collectionContributorsDuplicates = _.intersectionBy(collectionContributorsRepo, this.state.contributors, 'login');


          this.setState({
            contributors: [ ...this.state.contributors, ...collectionContributorsUniques ],
            contributorsDuplicates: [...this.state.contributors, ...collectionContributorsDuplicates]
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
