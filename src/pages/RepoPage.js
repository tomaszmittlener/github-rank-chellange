import React from 'react';

//components
import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import PageTitle from '../components/PageTilte';
import TopContributorsList from '../components/ContributorsList';

//redux
import { connect } from 'react-redux';
import mapStateToProps from '../utils/mapStateToProps';


//lodash
import find from 'lodash/find'
import some from 'lodash/some'
import filter from 'lodash/filter'


class RepoPage extends React.Component {
  constructor() {
    super();
    this.state = {
      repoInfo: {},
      repoContributors: []
    }
  }

  //Will redirect to HomePage if Redux store is empty/reset due to page refresh.
  componentWillMount() {
    if (!this.props.root.contributors.length > 0) {
      this.props.history.push('/');
    }
  }

  componentDidMount () {
    //list of appropriate contributors is obtained based on the list of all repos and contributors stored in the store (contributorsWithRepos).
    //Detailed info
    let { repoName } = this.props.match.params;
    let { contributorsWithRepos, contributors, repos } = this.props.root;
    const uniqueContributors = filter(contributorsWithRepos, o => {
      return o.repo === repoName
    });

    this.setState({
      repoInfo: find(repos, repo => {
        return repo.name === repoName
      }),
      repoContributors: filter(contributors, contributor => {
        return some(uniqueContributors, contributorsTwo => {
          return contributorsTwo.contributor === contributor.login
        });
      })
    });
  }

  render() {
    let { repoContributors, repoInfo } = this.state;

    return (
      <Page className="page--RepoPage"
            pageTitle={`.../repos/${this.props.match.params.userName}/${this.props.match.params.repoName}`}>
        <InfoPanel className="infoPanel--RepoPage"
                   repo={repoInfo}/>
        <MainPanel className="mainPanel--RepoPage">

          <PageTitle> contributors:</PageTitle>

          <TopContributorsList className="userContributorsList--RepoPage"
                               contributors={repoContributors}
                               requireFilters={false}/>
        </MainPanel>
      </Page>
    );
  }
}

RepoPage.propTypes = {
  repoName: React.PropTypes.string,
  userName: React.PropTypes.string
};


export default connect(mapStateToProps)(RepoPage);
