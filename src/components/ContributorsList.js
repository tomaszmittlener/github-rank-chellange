import React from 'react';
import { Link } from 'react-router-dom';

//icons
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import MdContentCut from 'react-icons/lib/md/content-cut';
import GoOrganization from 'react-icons/lib/go/organization';
import GoGist from 'react-icons/lib/go/gist';
import MdFolder from 'react-icons/lib/md/folder';
import GoGitPullRequest from 'react-icons/lib/go/git-pull-request';

//components
import List from './List';

//lodash
import filter from 'lodash/filter'
import map from 'lodash/map';

class TopContributorsList extends React.Component {
  constructor() {
    super();
    this.state = {
      contributors: [],
      filterResults: {
        contributions: '',
        followers: '',
        repos: '',
        gists: ''
      }
    };
    this.FILTERS = {
      contributions:{
        icon: <GoGitPullRequest className="icon"/>,
        title: 'contributions',
        name: 'filterContributions',
        outputId: 'filterContributionsOutput',
        inputId: 'filterContributionsInput',
        maxValue: '',
        lastResults: ''
      },
      followers:{
        icon: <GoOrganization className="icon"/>,
        title: 'followers',
        name: 'filterFollowers',
        outputId: 'filterFollowersOutput',
        inputId: 'filterFollowersInput',
        maxValue: '',
        lastResults: ''
      },
      repos: {
        icon: <MdFolder className="icon"/>,
        title: 'repos',
        name: 'filterRepos',
        outputId: 'filterReposOutput',
        inputId: 'filterReposInput',
        maxValue: '',
        lastResults: ''
      },
      gists: {
        icon: <GoGist className="icon"/>,
        title: 'gists',
        name: 'filterGists',
        outputId: 'filterGistsOutput',
        inputId: 'filterGistsInput',
        maxValue: '',
        lastResults: ''
      }
    };
  }

  //starts in th case of redirection from other page
  //get contributors and if filters required 1) get max values for filters, 2) set default values
  componentDidMount() {
    if(this.props) {
      this.setState({
        contributors: this.props.contributors
      });

      if (this.props.requireFilters === true) {
        this.FILTERS.contributions.maxValue = this.props.filterContributionsMaxValue;
        this.FILTERS.followers.maxValue = this.props.filterFollowersMaxValue;
        this.FILTERS.repos.maxValue = this.props.filterReposMaxValue;
        this.FILTERS.gists.maxValue = this.props.filterGistsMaxValue;

        this.FILTERS.contributions.lastResults = this.props.filterContributionsMaxValue;
        this.FILTERS.followers.lastResults = this.props.filterFollowersMaxValue;
        this.FILTERS.repos.lastResults = this.props.filterReposMaxValue ;
        this.FILTERS.gists.lastResults = this.props.filterGistsMaxValue;
      }

    }
  }

  //starts at first time
  //get contributors and if filters required 1) get max values for filters, 2) set default values
  componentWillReceiveProps(nextProps){
    this.setState({
      contributors: nextProps.contributors
    });

    if (nextProps.requireFilters === true) {
      this.FILTERS.contributions.maxValue = nextProps.filterContributionsMaxValue;
      this.FILTERS.followers.maxValue = nextProps.filterFollowersMaxValue;
      this.FILTERS.repos.maxValue = nextProps.filterReposMaxValue;
      this.FILTERS.gists.maxValue = nextProps.filterGistsMaxValue;

      this.FILTERS.contributions.lastResults = nextProps.filterContributionsMaxValue;
      this.FILTERS.followers.lastResults = nextProps.filterFollowersMaxValue;
      this.FILTERS.repos.lastResults = nextProps.filterReposMaxValue;
      this.FILTERS.gists.lastResults = nextProps.filterGistsMaxValue;
    }
  }

  //On submit the list will be filtered in accordance with chosen criteria.
  _filter(e) {
    e.preventDefault();
    this.setState({
      //apply filter
      contributors:
        filter(this.props.contributors, contributor => {
          return contributor.contributions < e.target.filterContributions.value &&
            contributor.followers < e.target.filterFollowers.value &&
            contributor.public_repos < e.target.filterRepos.value &&
            contributor.public_gists < e.target.filterGists.value
        })
    });
    //gather data to display current settings
    this.FILTERS.contributions.lastResults = e.target.filterContributions.value;
    this.FILTERS.followers.lastResults = e.target.filterFollowers.value;
    this.FILTERS.repos.lastResults = e.target.filterRepos.value;
    this.FILTERS.gists.lastResults = e.target.filterGists.value;
  }

  render() {
    let { requireFilters, pageStatus } = this.props;
    let { contributors } = this.state;

    const Filters = () => {
      return (
        <form className="list__filters" onSubmit={this._filter.bind(this)}>
          <div className="filters">
            {map(this.FILTERS, (filter, index) =>
              <div className="filters-slider"
                   key={index}>

                <input name={filter.name}
                       id={filter.inputId}
                       type="range"
                       min="0"
                       step="1"
                       max={filter.maxValue}
                       onChange={e => document.getElementById(filter.outputId).value = e.target.value}
                       defaultValue={filter.lastResults}/>
                <div className="filters-title">

                  <span className="filters-title__state">
                    {filter.icon}{`${filter.title} < `}
                    {typeof filter.lastResults === typeof undefined &&
                    typeof filter.maxValue === 'number'  ?
                      filter.maxValue
                      :
                      filter.lastResults}
                  </span>

                  <span className="filters-title__values">
                    {pageStatus === 'done' ?
                      <span>
                        <output className="filters-title__current" id={filter.outputId}/>
                        <span className="filters-title__max"> / {filter.maxValue} </span>
                      </span>
                      :
                      'loading...'}
                  </span>

                </div>
              </div>
            )}

            <div className="filters-button">
              <button className="button">
                <MdContentCut className="button-icon"/>
              </button>
            </div>
          </div>
        </form>
      );
    };

    const ListItems = () => {

      return (
        <div className="list__items">
          {map(contributors, (contributor, index)=>
            <div className="list-item"
                 key={index}>

              <Link className="link"
                    to={`/user/${contributor.login}`}>
                <MdAccountCircle className="list-item__image"/>
              </Link>

              <div className="list-item__title">
                <Link className="link"
                      to={`/user/${contributor.login}`}>
                  <h3>
                    {contributor.login}
                  </h3>
                </Link>
              </div>

              <div className="list-item__details">
                <h4 className="list-item-detail--person">
                  <GoGitPullRequest className="icon"/>
                  {contributor.contributions}
                </h4>

                {/*display followers, repos and gists if required in props.*/}
                  <h5 className="list-item-detail--person">
                    <GoOrganization className="icon"/>
                    {typeof contributor.followers === 'number' ?
                      contributor.followers:
                      'loading...'}
                  </h5>

                  <h5 className="list-item-detail--person">
                    <MdFolder className="icon"/>
                    {typeof contributor.public_repos === 'number' ?
                      contributor.public_repos:
                      'loading...'}
                  </h5>


                  <h5 className="list-item-detail--person">
                    <GoGist className="icon"/>
                    {typeof contributor.public_gists === 'number' ?
                      contributor.public_gists :
                      'loading...'}
                  </h5>


              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <List className="list--topContributorsList">
        {/*display filters if required in props*/}
        {requireFilters? <Filters/> : null}
        {/*display items*/}
        <ListItems/>
      </List>
    );
  }
}

TopContributorsList.PropTypes = {
  pageStatus: React.PropTypes.bool,
  contributors: React.PropTypes.array,
  requireFilters: React.PropTypes.bool.isRequired,
  filterContributionsMax: React.PropTypes.object,
  filterFollowersMax: React.PropTypes.object,
  filterReposMax: React.PropTypes.object,
  filterGistsMax: React.PropTypes.object
};

TopContributorsList.defaultProps = {
  filterMaxValues: {
    filterContributionsMaxValue: '',
    filterFollowersMaxValue: '',
    filterReposMaxValue: '',
    filterGistsMaxValue: ''
  }
};



export default TopContributorsList;
