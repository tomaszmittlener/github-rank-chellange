require('normalize.css/normalize.css');
require('../styles/main.scss');

import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import RepoPage from '../pages/RepoPage';

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <Route exact path="/"
               component={HomePage}/>
        <Route exact path="/user/:userName"
               component={UserPage}/>
        <Route exact path="/repo/:userName/:repoName"
               component={RepoPage}/>
      </div>
    );
  }
}

App.PropTypes = {
};

export default App;
