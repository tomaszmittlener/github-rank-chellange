import React from 'react';

import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import TopContributorsList from '../components/TopContributorsList';

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
    let { repoContributors, repoInfo, userAvatar } = this.state;

    return (
      <Page className="page--RepoPage">

        <LeftPanel className="leftPanel--RepoPage"
                   image={userAvatar}
                   title={repoInfo.name}
                   type={repoInfo.language}/>

        <RightPanel className="rightPanel--RepoPage">

          <TopContributorsList className="userReposList--RepoPage"
                               contributors={repoContributors}
                               requireFilters={false}
                               requireDetails={false}/>

        </RightPanel>

      </Page>
    );
  }
}

RepoPage.propTypes = {
  repoName: React.PropTypes.string,
  userName: React.PropTypes.string
};

export default RepoPage;
