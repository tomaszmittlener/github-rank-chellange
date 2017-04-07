import React from 'react';
import List from './List';

import map from 'lodash/map';

class TopContributorsList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let { contributors } = this.props;

    return (
      <List className="list--topContributorsList">

        <div className="list__items">
          {map(contributors, (contributor, index)=>

            <div className="list-item"
                 key={index}>

              <img className="list-item__image"
                   src={contributor.avatar_url}/>

              <div className="list-item__details">
                <h4>{contributor.login}</h4>
                <h5>{contributor.contributions}</h5>
              </div>

            </div>
          )}
        </div>

        {this.props.children}

      </List>
    );
  }
}

TopContributorsList.defaultProps = {
};

export default TopContributorsList;
