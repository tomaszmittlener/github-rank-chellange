import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'
import List from '../components/List'

import { getRepos, getContributors } from '../services/getData'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import sortBy from 'lodash/sortBy'


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      reposOwner: '',
      reposOwnerImage: '',
      reposOwnerType: '',
      repoNames: [],
      contributorsNames: {},
      contributors: {}
    }
  }

  componentDidMount() {
    this._downloadData();
  }

  _downloadData() {
    getRepos()
      .then(reposCollection =>{
        this.setState({
          repos: reposCollection,
          reposOwner: reposCollection[0].owner.login,
          reposOwnerImage: reposCollection[0].owner.avatar_url,
          reposOwnerType: reposCollection[0].owner.type
        });
        this._getUniqueContributors();
      });
  }

  _getUniqueContributors() {
    const nonDuplicateContributors = this.state.contributors;

    map(this.state.repos, (repo) => {
      getContributors(repo.name)
        .then(contributorsCollection => {
            forEach(contributorsCollection, user => {
              if (!nonDuplicateContributors.hasOwnProperty(user.login)) {
                nonDuplicateContributors[user.login] = user;
              } else {
                nonDuplicateContributors[user.login].contributions += user.contributions;
              }
            });
            this.setState({
              contributors: nonDuplicateContributors
            });
            this._sortByContributions();
          }
        );
    });
  }

  _sortByContributions() {
    let sortedContributors = sortBy(this.state.contributors, 'contributions').reverse();
    this.setState({
      contributors: sortedContributors
    })
  }

  render() {
    let { repos,  contributors, reposOwner, reposOwnerImage, reposOwnerType } = this.state;

    return (
      <Page>

        <LeftPanel image={reposOwnerImage} title={reposOwner} type={reposOwnerType} />

        <RightPanel>

          <List>

            <h1>Home Page</h1>
            <h2>Downloaded: </h2>
            <ul>
              <li>repos: {repos.length}</li>
              <li>contributors: {contributors.length}</li>
              <ol>
                {map(contributors, (contributor, index)=>{
                  return <li key={index}>name: {contributor.login} contributions:  {contributor.contributions}
                  </li>
                })}
              </ol>
            </ul>

          </List>



        </RightPanel>

      </Page>
    );
  }
}




HomePage.defaultProps = {
};

export default HomePage;
