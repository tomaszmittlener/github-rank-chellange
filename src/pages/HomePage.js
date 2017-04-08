import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

import { getRepos, getContributors, getUserInfo } from '../services/getData';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import reduce from 'lodash/reduce';


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
                this._getUserDetailedInfo(user.login)

              } else {
                nonDuplicateContributors[user.login].contributions += user.contributions;
              }
            });
            this.setState({
              contributors: nonDuplicateContributors
            });
            this._sortByContributions();
          }
        );
    });
  }

  _sortByContributions() {
    let sortedContributors = sortBy(this.state.contributors, 'contributions').reverse();
    this.setState({
      contributors: sortedContributors
    })
  }

  _getUserDetailedInfo(name) {
    getUserInfo(name)
      .then(userInfo => {
        this.setState({
          usersInfo: [...this.state.usersInfo, userInfo]
        })
      })
  }



  render() {
    let { reposOwner, reposOwnerImage, reposOwnerType, contributors, usersInfo } = this.state;
    console.log(usersInfo);
    return (
      <Page>
        <LeftPanel clasnnName="leftPanel--homePage"
                   image={reposOwnerImage}
                   title={reposOwner}
                   type={reposOwnerType} />
        <RightPanel>
          <TopContributorsList contributors={contributors}/>
        </RightPanel>
      </Page>
    );
  }
}




HomePage.defaultProps = {
};

export default HomePage;
