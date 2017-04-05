import React from 'react';
import map from 'lodash/map'

import {getUser} from '../services/getData';


class TestPage extends React.Component {
  constructor(){
    super();
    this.state = {
      userData: {}
    }
  }

  componentDidMount() {
    getUser('angular').then(userInfo => {
      this.setState({
        userData: userInfo
      });
      console.log(`username: ${userInfo.name}`);
    })

  }

  render() {
    let TestArray =[1,2, 3];
    return (
      <div className="index">
        <div className="notice"><h3>Test Page with:</h3>
          <ul>
            <li>Router</li>
            <li>SCSS</li>
            <li>Susy</li>
            <li>Modular Scale</li>
            <li>Lodash - test:
              {map(TestArray, (no, index) => <span key={index}> ({no}) </span>)}
            </li>
            <li>github fetch api test: username- <strong>{this.state.userData.name}</strong></li>
          </ul>
        </div>
      </div>
    );
  }
}

TestPage.defaultProps = {
};

export default TestPage;
