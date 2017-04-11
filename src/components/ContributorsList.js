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

    this.state = {
      contributors: [],
      filterContributionsMax: {},
      filterFollowersMax: {},
      filterReposMax: {},
      filterGistsMax: {},
      filterContributionsValue: '',
      filterFollowersValue: '',
      filterReposValue: '',
      filterGistsValue: ''
    }
  }

  //receive contributors and if filters required - max values for filters.
  // Use roundMaxNumber to set rounded max value for filters
  componentWillReceiveProps(nextProps){

    this.setState({
      contributors: nextProps.contributors
    });

    nextProps.requireFilters ?
    this.setState({
      contributors: nextProps.contributors,
      filterContributionsValue:
        typeof nextProps.filterContributionsMax.contributions !== 'number' ?
          'Loading...':
          roundMaxNumber(nextProps.filterContributionsMax.contributions),
      filterFollowersValue:
        typeof nextProps.filterFollowersMax.followers !== 'number' ?
          'Loading...':
          roundMaxNumber(nextProps.filterFollowersMax.followers),
      filterReposValue:
        typeof nextProps.filterReposMax.public_repos !== 'number' ?
          'Loading...':
          roundMaxNumber(nextProps.filterReposMax.public_repos),
      filterGistsValue:
        typeof nextProps.filterGistsMax.public_gists !== 'number' ?
          'Loading...':
          roundMaxNumber(nextProps.filterGistsMax.public_gists)
    }):
      null
  }

  //On submit the list will be filtered in accordance with chosen criteria.
  //Values could be also retrieved directly from the form e.target.inputName.value
  _filter() {
    this.setState({
      contributors:
        filter(this.props.contributors, contributor => {
          return contributor.contributions < this.state.filterContributionsValue &&
            contributor.followers < this.state.filterFollowersValue &&
            contributor.public_repos < this.state.filterReposValue &&
            contributor.public_gists < this.state.filterGistsValue
        })
    });
  }

  _submit(e){
    e.preventDefault();
    this._filter();
  }

  render() {
    let {
      contributors,
      filterContributionsValue,
      filterFollowersValue,
      filterReposValue,
      filterGistsValue
    } = this.state;

    let {
      filterContributionsMax,
      filterFollowersMax,
      filterReposMax,
      filterGistsMax,
      requireDetails,
      requireFilters
    } = this.props;


    return (
      <List className="list--topContributorsList">

        {/*display filters if required in props*/}

        {requireFilters?
          <form className="list__filters"
                onSubmit={this._submit.bind(this)}>

            {/*slider 1 - contributions*/}

            <h4 className="filters-title">
              <GoGitPullRequest className="icon"/>
              Contributions:
              <output name="filterContributionsOutput">{filterContributionsValue}</output>
            </h4>

            <input name="filterContributions"
                   className="filters-contributions"
                   type="range"
                   min="0"
                   step={getSteps(filterContributionsValue)}
                   max={roundMaxNumber(filterContributionsMax.contributions)}
                   onChange={e => this.setState({filterContributionsValue: e.target.value})}
                   default={filterContributionsMax}/>

            {/*slider 2 - followers*/}

            <h4 className="filters-title">
              <GoOrganization className="icon"/>
              Followers:
              <output name="filterFollowersOutput">{filterFollowersValue}</output>
            </h4>
            <input name="filterFollowers"
                   className="filters-followers"
                   type="range"
                   min="0"
                   step={getSteps(filterFollowersValue)}
                   max={roundMaxNumber(filterFollowersMax.followers)}
                   onChange={e => this.setState({filterFollowersValue: e.target.value})}
                   default={filterFollowersMax}/>

            {/*slider 3 - repos*/}

            <h4  className="filters-title">
              <GoRepo className="icon"/>
              Repos:
              <output name="filterReposOutput">{filterReposValue}</output>
            </h4>
            <input name="filterRepos"
                   className="filters-repos"
                   type="range"
                   min="0"
                   step={getSteps(filterReposValue)}
                   max={roundMaxNumber(filterReposMax.public_repos)}
                   onChange={e => this.setState({filterReposValue: e.target.value})}
                   default={filterReposMax}/>


            {/*slider 4 - gists*/}

            <h4 className="filters-title">
              <GoGist className="icon"/>
              Gists:
              <output name="filterGistsOutput">{filterGistsValue}</output>
            </h4>
            <input name="filterGists"
                   className="filters-gists"
                   type="range"
                   min="0"
                   step={getSteps(filterGistsValue)}
                   max={roundMaxNumber(filterGistsMax.public_gists)}
                   onChange={e => this.setState({filterGistsValue: e.target.value})}
                   default={filterGistsMax}/>

            {/*button*/}

            <button className="filters-button">
              <MdFilterList className="icon"/>
            </button>

          </form> :
          null}


        {/*display items*/}

        <div className="list__items">

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
  filterContributionsMax: React.PropTypes.object,
  filterFollowersMax: React.PropTypes.object,
  filterReposMax: React.PropTypes.object,
  filterGistsMax: React.PropTypes.object
};

export default TopContributorsList;
