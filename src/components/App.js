require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import TestPage from '../pages/TestPage';

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/test" component={TestPage}/>
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
