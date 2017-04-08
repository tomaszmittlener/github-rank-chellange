import React from 'react';

import Page from '../components/Page';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';

import { getUserInfo } from '../services/getData'

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {}
    }

  }

  componentDidMount () {
    getUserInfo(this.props.match.params.username)
      .then(userInfo => {
        this.setState({
          userInfo: userInfo
        })
      })
  }

  render() {
    let { userInfo } =this.state;

    return (
      <Page className="page--userPage">
        <LeftPanel className="leftPanel--userPage"
                   image={userInfo.avatar_url}
                   title={userInfo.login}
                   type={userInfo.type}/>
        <RightPanel className="rightPanel--userPage">

          <h1>User page</h1>

        </RightPanel>
      </Page>
    );
  }
}

UserPage.defaultProps = {
};

export default UserPage;
