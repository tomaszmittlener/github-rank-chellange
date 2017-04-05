import React from 'react';
import map from 'lodash/map'


class TestPage extends React.Component {
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
          </ul>
        </div>
      </div>
    );
  }
}

TestPage.defaultProps = {
};

export default TestPage;
