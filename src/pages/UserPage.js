import React from 'react';

import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import UserReposList from '../components/UserReposList';

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
    getUserInfo(this.props.match.params.username)
      .then(userInfo => {
        this.setState({
          userInfo: userInfo
        })
      });
    getRepos(this.props.match.params.username)
      .then(reposList => {
        this.setState({
          userRepos: reposList
        })
      })
  }

  render() {
    let { userInfo, userRepos } =this.state;

    return (
      <Page className="page--userPage">
        <LeftPanel className="leftPanel--userPage"
                   image={userInfo.avatar_url}
                   title={userInfo.login}
                   type={userInfo.type}/>
        <RightPanel className="rightPanel--userPage">

          <UserReposList className="userReposList--userPage"
                         repos={userRepos}/>

        </RightPanel>
      </Page>
    );
  }
}

UserPage.defaultProps = {
};

export default UserPage;
