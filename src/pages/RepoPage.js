import React from 'react';

//components
import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import PageTitle from '../components/PageTilte';
import TopContributorsList from '../components/ContributorsList';

//tools
import { getContributors, getRepoInfo } from '../services/getData'

class RepoPage extends React.Component {
  constructor() {
    super();
    this.state = {
      repoInfo: {},
      userAvatar: '',
      repoContributors: []
    }
  }

  componentDidMount () {
    let {repoName, userName } = this.props.match.params;

    getRepoInfo(repoName, userName)
      .then(repoInfo => {
        this.setState({
          repoInfo: repoInfo,
          userAvatar: repoInfo.owner.avatar_url
        })
      });

    getContributors(repoName, userName)
      .then(contributorsCollection => {
        this.setState({
          repoContributors: contributorsCollection
        })
      });
  }

  render() {
    let { repoContributors, repoInfo } = this.state;

    return (
      <Page className="page--RepoPage"
            pageTitle={
              `.../repos/${this.props.match.params.userName}/${this.props.match.params.repoName}`
            }>
        <InfoPanel className="infoPanel--RepoPage"
                   repo={repoInfo}/>
        <MainPanel className="mainPanel--RepoPage">
          <PageTitle>/contributors:</PageTitle>

          <TopContributorsList className="userReposList--RepoPage"
                               contributors={repoContributors}
                               requireFilters={false}
                               requireDetails={false}/>
        </MainPanel>
      </Page>
    );
  }
}

RepoPage.propTypes = {
  repoName: React.PropTypes.string,
  userName: React.PropTypes.string
};

export default RepoPage;
