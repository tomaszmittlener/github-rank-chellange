import React from 'react';
import Page from '../components/Page'

import { getUser } from '../services/getData'


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'angular'
    }
  }

  componentDidMount() {
    getUser(this.state.username).then(userInfo => {
      this.setState({
        userData: userInfo
      });
    })
  }

  render() {
    return (
      <Page>
        <h1>Home Page</h1>
        <h2>username: {this.state.username}</h2>
      </Page>
    );
  }
}

HomePage.defaultProps = {
};

export default HomePage;
