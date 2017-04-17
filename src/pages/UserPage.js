import React from 'react';

//components
import Page from '../components/Page';
import InfoPanel from '../components/InfoPanel';
import MainPanel from '../components/MainPanel';
import PageTitle from '../components/PageTilte';
import ReposList from '../components/ReposList';

//redux
import { connect } from 'react-redux';
import mapStateToProps from '../utils/mapStateToProps';

//lodash
import find from 'lodash/find'
import some from 'lodash/some'
import filter from 'lodash/filter'


class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      userRepos: []
    };
    }

  componentDidMount () {
      let { contributorsWithRepos, contributors, repos } = this.props.root;
      const uniqueRepos = filter(contributorsWithRepos, o => {
        return o.contributor === this.props.match.params.userName
      });

      this.setState({
        userInfo: find(contributors, contributor => {
          return contributor.login === this.props.match.params.userName
        }),
        userRepos: filter(repos, repo => {
          return some(uniqueRepos, reposTwo => {
            return reposTwo.repo === repo.name
          });
        })
      });
  }

  render() {
    let { userInfo, userRepos } = this.state;

    return (
      <Page className="page--userPage"
            pageTitle={
              `.../users/${this.props.match.params.userName}`
            }>
        <InfoPanel className="infoPanel--userPage"
                   person={userInfo}/>

        <MainPanel className="mainPanel--userPage">
          <PageTitle>repos:</PageTitle>

          <ReposList className="userReposList--userPage"
                     repos={userRepos}/>
        </MainPanel>
      </Page>
    );
  }
}

UserPage.PropTypes = {
};

export default connect(mapStateToProps)(UserPage);
