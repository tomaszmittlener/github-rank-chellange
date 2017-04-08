import React from 'react';
import List from './List';
import {Link} from 'react-router-dom';


import map from 'lodash/map';

class UserReposList extends React.Component {
  constructor() {
    super();
  }

  render() {

    let { repos } = this.props;

    return (
      <List className="list--UserReposList">

        <div className="list__items">
          {map(repos, (repo, index)=>

            <div className="list-item"
                 key={index}>

              <img className="list-item__image"
                   src={repo.owner.avatar_url}/>

              <div className="list-item__details">
                <h4>
                  <Link className="link" to={`/repo/${repo.name}`}>{repo.name}</Link>
                </h4>

                <h5>{repo.language}</h5>
                <h6>{repo.description}</h6>

              </div>

            </div>
          )}
        </div>



      </List>
    );
  }
}

UserReposList.defaultProps = {
};

export default UserReposList;
