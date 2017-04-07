import React from 'react';
import List from './List';

import map from 'lodash/map';

class TopContributorsList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let {contributors} = this.props;

    return (
      <List className="list--topContributorsList">

          <ol>
            {map(contributors, (contributor, index)=>{
              return <li key={index}>name: {contributor.login} contributions:  {contributor.contributions}
              </li>
            })}
          </ol>

        {this.props.children}
      </List>
    );
  }
}

TopContributorsList.defaultProps = {
};

export default TopContributorsList;
