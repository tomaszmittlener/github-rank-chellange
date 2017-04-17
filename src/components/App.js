//css styles
require('normalize.css/normalize.css');
require('../styles/main.scss');
//react
import React from 'react';
//router
import { Route } from 'react-router-dom';
//components
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


export default App;
