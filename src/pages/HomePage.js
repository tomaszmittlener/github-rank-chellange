import React from 'react';
import Page from '../components/Page'

import { getUserInfo, getUserRepos } from '../services/getData'
import map from 'lodash/map'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: 'angular',
      userInfo: {},
      userRepositoriesAmount: '',
      userRepos: []
    }
  }

  componentDidMount() {
    getUserInfo(this.state.userName).then(userInfo => {
      this.setState({
        userInfo: userInfo,
        userRepositoriesAmount: userInfo.public_repos
      });
    });

    this._getAllRepos(this.state.userName)
  }

  _getAllRepos(userName, pagesNumber = 1){

    if (this.state.userRepos.length !== this.state.userRepositoriesAmount)
      getUserRepos(userName, pagesNumber).then(receivedRepos => {
        this.setState({
          userRepos: this.state.userRepos.concat(...receivedRepos)
        });
        if (this.state.userRepos.length !== this.state.userRepositoriesAmount)
          this._getAllRepos(userName, pagesNumber + 1)
      })

  }

  render() {
    let {userName, userRepos} = this.state ;

    return (
      <Page>
        <h1>Home Page</h1>
        <h2>{userName}'s repositories ({this.state.userRepositoriesAmount}):</h2>
        <ol>
          {map(userRepos, (repo, index) =>
            <li key={index}>
              <strong>name: </strong>
              {repo.name}
              <strong> id: </strong>
              {repo.id}
            </li>)}
        </ol>
      </Page>
    );
  }
}

HomePage.defaultProps = {
};

export default HomePage;
