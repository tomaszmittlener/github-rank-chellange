import React from 'react';
import List from './List';
import { Link } from 'react-router-dom';

//icons
import MdFolder from 'react-icons/lib/md/folder';
import GoCode from 'react-icons/lib/go/code';
import GoQuestion from 'react-icons/lib/go/question';

//lodash
import map from 'lodash/map';

class UserReposList extends React.Component {
  render() {
    let { repos } = this.props;

    const ListItems = () => {
      return (
        <div className="list__items">
          {map(repos, (repo, index)=>
            <div className="list-item"
                 key={index}>
              <Link className="link"
                    to={`/repo/${repo.owner.login}/${repo.name}`}>
                <MdFolder className="list-item__image"/>
              </Link>

              <div className="list-item__title">
                <Link className="link"
                      to={`/repo/${repo.owner.login}/${repo.name}`}>
                  <h3>{repo.name}
                  </h3>
                </Link>
              </div>

              <div className="list-item__details">
                <h4 className="list-item-detail--repo">
                  {repo.language?
                    <GoCode className="icon"/> :
                    null}
                  {repo.language}
                </h4>

                <h6 className="list-item-detail--repo">
                  {repo.description?
                    <GoQuestion className="icon"/> :
                    null}
                  {repo.description}
                </h6>
              </div>
            </div>
          )}
        </div>
      )};

     return (
      <List className="list--UserReposList">
        <ListItems/>
      </List>
    );
  }
}


export default UserReposList;
