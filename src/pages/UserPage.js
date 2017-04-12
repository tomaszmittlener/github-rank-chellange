import React from 'react';

import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import ReposList from '../components/ReposList';

import { getUserInfo, getRepos } from '../services/getData'

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      userRepos: []
    }
  }

  componentDidMount () {
    getUserInfo(this.props.match.params.userName)
      .then(userInfo => {
        this.setState({
          userInfo: userInfo
        })
      });
    getRepos(this.props.match.params.userName)
      .then(reposList => {
        this.setState({
          userRepos: reposList
        })
      })
  }

  render() {
    let { userInfo, userRepos } = this.state;

    return (
      <Page className="page--userPage"
            pageTitle={`${this.props.match.params.userName}`}>
        <InfoPanel className="infoPanel--userPage"
                   person={userInfo}/>

        <MainPanel className="mainPanel--userPage">

          <ReposList className="userReposList--userPage"
                         repos={userRepos}/>

        </MainPanel>
      </Page>
    );
  }
}

UserPage.PropTypes = {
};

export default UserPage;
