import React from 'react';
import List from './List';
import {Link} from 'react-router-dom';

import GoRepo from 'react-icons/lib/go/repo';
import GoCode from 'react-icons/lib/go/code';
import GoQuestion from 'react-icons/lib/go/question';

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

              {/*<img className="list-item__image"*/}
              {/*src={repo.owner.avatar_url}/>*/}

              <GoRepo className="list-item__image"/>

              <div className="list-item__details">

                <h3>
                  <Link className="link"
                        to={`/repo/${repo.owner.login}/${repo.name}`}>
                    {repo.name}
                  </Link>
                </h3>

                <h4>
                  {repo.language?
                    <GoCode className="icon"/>:
                    null}
                  {repo.language}
                </h4>

                <h6>
                  {repo.description?
                    <GoQuestion className="icon"/>:
                    null}
                  {repo.description}
                </h6>

              </div>

            </div>
          )}

        </div>

      </List>
    );
  }
}

UserReposList.PropTypes = {
};

export default UserReposList;
