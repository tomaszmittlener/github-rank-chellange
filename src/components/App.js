require('normalize.css/normalize.css');
require('../styles/main.scss');

import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <Route exact path="/"
               component={HomePage}/>
        <Route exact path="/user/:username"
               component={UserPage}/>
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
