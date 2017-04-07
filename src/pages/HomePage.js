import React from 'react';
import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'

import { getRepos, getContributors } from '../services/getData'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import sortBy from 'lodash/sortBy'


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
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
          repos: reposCollection
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
    let { repos,  contributors } = this.state;

    return (
      <Page>

        <LeftPanel>
          <h1>
            Left Panel
          </h1>
        </LeftPanel>

        <RightPanel>

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

        </RightPanel>

      </Page>
    );
  }
}




HomePage.defaultProps = {
};

export default HomePage;
