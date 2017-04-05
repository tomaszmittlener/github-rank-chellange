import React from 'react';


class TestPage extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice"><h3>Test Page with:</h3>
          <ul>
            <li>Router</li>
            <li>SCSS</li>
          </ul>
        </div>
      </div>
    );
  }
}

TestPage.defaultProps = {
};

export default TestPage;
