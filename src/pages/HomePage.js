import React from 'react';
import Page from '../components/Page'

import { getUserInfo, getUserRepos } from '../services/getData'
import map from 'lodash/map'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      userName: 'angular',
      userRepos: []
    }
  }

  componentDidMount() {
    getUserInfo(this.state.userName).then(userData => {
      this.setState({
        userInfo: userData
      });
    }).then(
      getUserRepos(this.state.userName).then(reposList => {
        this.setState({
          userRepos: reposList
        });
      })
    )
  }

  render() {
    console.log(this.state.userRepos);

    let {userName, userRepos} = this.state ;

    return (
      <Page>
        <h1>Home Page</h1>
        <h2>{userName}'s repositories:</h2>
        <ul>
          {map(userRepos, (repo, index) =>
            <li key={index}>
              <strong>name: </strong>
              {repo.name}
              <strong> id: </strong>
              {repo.id}
            </li>)}
        </ul>
      </Page>
    );
  }
}

HomePage.defaultProps = {
};

export default HomePage;
