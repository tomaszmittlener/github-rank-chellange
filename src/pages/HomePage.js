import React from 'react';
import { Link } from 'react-router-dom'


class HomePage extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice"><h3>Home Page</h3>
          <Link to="/test" >Link to Test Page</Link>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
};

export default HomePage;
