import React from 'react';
import {Link} from 'react-router-dom';

import MdAccountCircle from 'react-icons/lib/md/account-circle';
import MdFilterList from 'react-icons/lib/md/filter-list';
import GoOrganization from 'react-icons/lib/go/organization';
import GoGist from 'react-icons/lib/go/gist';
import GoRepo from 'react-icons/lib/go/repo';
import GoGitPullRequest from 'react-icons/lib/go/git-pull-request';

import List from './List';
import { roundMaxNumber, getSteps } from '../services/utils';

import filter from 'lodash/filter'
import map from 'lodash/map';

class TopContributorsList extends React.Component {
  constructor() {
    super();
    this.FILTERS ={
      contributions:{
        icon: <GoGitPullRequest className="icon"/>,
        title: 'Contributions',
        name: 'filterContributions',
        outputId: 'filterContributionsOutput',
        maxValue: ''
      },
      followers:{
        icon: <GoOrganization className="icon"/>,
        title: 'Followers',
        name: 'filterFollowers',
        outputId: 'filterFollowersOutput',
        maxValue: ''
      },
      repos: {
        icon: <GoRepo className="icon"/>,
        title: 'Repos',
        name: 'filterRepos',
        outputId: 'filterReposOutput',
        maxValue: ''
      },
      gists: {
        icon: <GoGist className="icon"/>,
        title: 'Gists',
        name: 'filterGists',
        outputId: 'filterGistsOutput',
        maxValue: ''
      }
    };

    this.state = {
      contributors: []
    }
  }

  //receive contributors and if filters required - max values for filters.
  componentWillReceiveProps(nextProps){
    this.setState({
      contributors: nextProps.contributors
    });

    if (nextProps.requireFilters === true) {
      this.FILTERS.contributions.maxValue = nextProps.filterContributionsMax.contributions;
      this.FILTERS.followers.maxValue = nextProps.filterFollowersMax.followers;
      this.FILTERS.repos.maxValue = nextProps.filterReposMax.public_repos;
      this.FILTERS.gists.maxValue = nextProps.filterGistsMax.public_gists;
    }
  }

  //On submit the list will be filtered in accordance with chosen criteria.
  _filter(e) {
    e.preventDefault();
    this.setState({
      contributors:
        filter(this.props.contributors, contributor => {
          return contributor.contributions < e.target.filterContributions.value &&
            contributor.followers < e.target.filterFollowers.value &&
            contributor.public_repos < e.target.filterRepos.value &&
            contributor.public_gists < e.target.filterGists.value
        })
    });
  }

  render() {
    let { contributors } = this.state;
    let { requireDetails, requireFilters } = this.props;

    return (
      <List className="list--topContributorsList">

        {/*display filters if required in props*/}
        {requireFilters?
          <form className="list__filters" onSubmit={this._filter.bind(this)}>
            <div className="filters">

              {/*map thought FILTERS object*/}
              {map(this.FILTERS, (filter, index) =>
                <div className="filters-slider"
                     key={index}>
                  <h4 className="filters-title">
                    {filter.icon}
                    {filter.title}:
                    <output id={filter.outputId}>
                      {typeof filter.maxValue === 'number' ?
                        roundMaxNumber(filter.maxValue) :
                        'Loading...'}
                    </output>
                  </h4>
                  <input name={filter.name}
                         type="range"
                         min="0"
                         step={getSteps(filter.maxValue)}
                         max={roundMaxNumber(filter.maxValue)}
                         onChange={e => document.getElementById(filter.outputId).value = e.target.value }
                         default={roundMaxNumber(filter.maxValue)}/>
                </div>
              )}

              {/*button*/}
              <div className="filters-button">
                <button className="button">
                  <MdFilterList className="button-icon"/>
                </button>
              </div>
            </div>
          </form> :
          null
        }

        {/*display items*/}
        <div className="list__items">

          {/*map through all contributors*/}
          {map(contributors, (contributor, index)=>
            <div className="list-item"
                 key={index}>
              <MdAccountCircle className="list-item__image"/>
              <div className="list-item__details">
                <h3>
                  <Link className="link"
                        to={`/user/${contributor.login}`}>
                    {contributor.login}
                  </Link>
                </h3>
                <h4>
                  <GoGitPullRequest className="icon"/>
                  {contributor.contributions}
                </h4>

                {/*display followers, repos and gists if required in props.*/}
                {requireDetails?
                  <div>
                    <h5>
                      <GoOrganization className="icon"/>
                      {typeof contributor.followers === 'number' ?
                        contributor.followers:
                        'loading...'}
                    </h5>
                    <h5>
                      <GoRepo className="icon"/>
                      {typeof contributor.public_repos === 'number' ?
                        contributor.public_repos:
                        'loading...'}
                    </h5>
                    <h5>
                      <GoGist className="icon"/>
                      {typeof contributor.public_gists === 'number' ?
                        contributor.public_gists :
                        'loading...'}
                    </h5>
                  </div> :
                  null}
              </div>
            </div>
          )}
        </div>
        {this.props.children}
      </List>
    );
  }
}

TopContributorsList.PropTypes = {
  contributors: React.PropTypes.array,
  requireFilters: React.PropTypes.bool.isRequired,
  requireDetails: React.PropTypes.bool.isRequired,
  filterContributionsMax: React.PropTypes.object,
  filterFollowersMax: React.PropTypes.object,
  filterReposMax: React.PropTypes.object,
  filterGistsMax: React.PropTypes.object
};

export default TopContributorsList;
