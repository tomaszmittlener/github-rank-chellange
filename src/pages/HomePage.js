import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

import { getRepos, getContributors, getUserInfo } from '../services/getData';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      reposOwner: '',
      reposOwnerImage: '',
      reposOwnerType: '',
      contributors: {},
      usersInfo: []
    }
  }

  componentDidMount() {
    this._downloadData();
  }

  _downloadData() {
    getRepos()
      .then(reposCollection =>{

        this.setState({
          repos: reposCollection,
          reposOwner: reposCollection[0].owner.login,
          reposOwnerImage: reposCollection[0].owner.avatar_url,
          reposOwnerType: reposCollection[0].owner.type
        });
        this._getUniqueContributors();

      });
  }

  _getUniqueContributors() {
    const nonDuplicateContributors = this.state.contributors;

    map(this.state.repos, (repo) => {
      getContributors(repo.name)
        .then(contributorsCollection => {

          forEach(contributorsCollection, user => {
            if (!nonDuplicateContributors.hasOwnProperty(user.login)) {
              nonDuplicateContributors[user.login] = user;
              this._getUserDetailedInfo(user.login, nonDuplicateContributors)
            } else {
              nonDuplicateContributors[user.login].contributions += user.contributions;
            }
          });

          this.setState({
            contributors: nonDuplicateContributors
          });
        });
    });
  }

  _getUserDetailedInfo(name, collection) {
    getUserInfo(name)
      .then(userInfo => {

        collection[userInfo.login].followers = userInfo.followers;
        collection[userInfo.login].public_repos = userInfo.public_repos;
        collection[userInfo.login].public_gists = userInfo.public_gists;

        this.setState({
          contributors: collection
        });
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
