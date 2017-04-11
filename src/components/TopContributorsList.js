import React from 'react';
import {Link} from 'react-router-dom';

import MdAccountCircle from 'react-icons/lib/md/account-circle';
import MdFilterList from 'react-icons/lib/md/filter-list';
import GoOrganization from 'react-icons/lib/go/organization';
import GoGist from 'react-icons/lib/go/gist';
import GoRepo from 'react-icons/lib/go/repo';
import GoGitPullRequest from 'react-icons/lib/go/git-pull-request';


import List from './List';


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

  //receive contributrs and max values for filters. +1 added, as filters display numbers < than selected
  componentWillReceiveProps(nextProps){
    this.setState({
      contributors: nextProps.contributors,
      filterContributionsValue:
        typeof nextProps.filterContributionsMax.contributions !== 'number' ?
          'Loading...':
          nextProps.filterContributionsMax.contributions +1,
      filterFollowersValue:
        typeof nextProps.filterFollowersMax.followers !== 'number' ?
          'Loading...':
          nextProps.filterFollowersMax.followers + 1,
      filterReposValue:
        typeof nextProps.filterReposMax.public_repos !== 'number' ?
          'Loading...':
          nextProps.filterReposMax.public_repos + 1,
      filterGistsValue:
        typeof nextProps.filterGistsMax.public_gists !== 'number' ?
          'Loading...':
          nextProps.filterGistsMax.public_gists + 1
    })
  }

  //on submit the list will be filtered in accordance with chosen criteria.
  //this data could be also retrieved directly from the form e.target.inputName.value
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
      filterGistsMax
    } = this.props;

    return (
      <List className="list--topContributorsList">
        <form className="list__filters"
              onSubmit={this._submit.bind(this)}>

          <h4>
            <GoGitPullRequest/>
            Contributions
          </h4>
          <input name="filterContributions"
                 className="filters-contributions"
                 type="range"
                 min="0"
                 max={filterContributionsMax.contributions + 1}
                 onChange={e => this.setState({filterContributionsValue: e.target.value})}
                 default={filterContributionsMax}/>
          <output name="filterContributionsOutput">{filterContributionsValue}</output>

          <h4>
            <GoOrganization/>
            Followers
          </h4>
          <input name="filterFollowers"
                 className="filters-followers"
                 type="range"
                 min="0"
                 max={filterFollowersMax.followers + 1}
                 onChange={e => this.setState({filterFollowersValue: e.target.value})}
                 default={filterFollowersMax}/>
          <output name="filterContributionsOutput">{filterFollowersValue}</output>


          <h4>
            <GoRepo/>
            Repos
          </h4>
          <input name="filterRepos"
                 className="filters-repos"
                 type="range"
                 min="0"
                 max={filterReposMax.public_repos + 1}
                 onChange={e => this.setState({filterReposValue: e.target.value})}
                 default={filterReposMax}/>
          <output name="filterContributionsOutput">{filterReposValue}</output>


          <h4>
            <GoGist/>
            Gists
          </h4>
          <input name="filterGists"
                 className="filters-gists"
                 type="range"
                 min="0"
                 max={filterGistsMax.public_gists + 1}
                 onChange={e => this.setState({filterGistsValue: e.target.value})}
                 default={filterGistsMax}/>
          <output name="filterContributionsOutput">{filterGistsValue}</output>


          <button>
            <MdFilterList/>
          </button>

        </form>

        <div className="list__items">
          {map(contributors, (contributor, index)=>

            <div className="list-item"
                 key={index}>
              <MdAccountCircle className="list-item__image"/>

              {/*<img className="list-item__image"*/}
              {/*src={contributor.avatar_url}/>*/}


              <div className="list-item__details">
                <h4>
                  <Link className="link"
                        to={`/user/${contributor.login}`}>
                    {contributor.login}
                  </Link>
                </h4>

                <h5>
                  <GoGitPullRequest className="details-icon"/>
                  {contributor.contributions}
                </h5>

                <h6>
                  <GoOrganization className="details-icon"/>
                  {contributor.followers}
                </h6>

                <h6>
                  <GoRepo className="details-icon"/>
                  {contributor.public_repos}
                </h6>

                <h6>
                  <GoGist className="details-icon"/>
                  {contributor.public_gists}
                </h6>

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
  contributors: React.PropTypes.array.isRequired,
  filterContributionsMax: React.PropTypes.object.isRequired,
  filterFollowersMax: React.PropTypes.object.isRequired,
  filterReposMax: React.PropTypes.object.isRequired,
  filterGistsMax: React.PropTypes.object.isRequired
};

export default TopContributorsList;
