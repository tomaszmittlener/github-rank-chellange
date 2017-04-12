import React from 'react';

import MdAccountBalance from 'react-icons/lib/md/account-balance';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import GoRepo from 'react-icons/lib/go/repo';


class InfoPanel extends React.Component {
  constructor() {
    super();
  }


  render() {
    let { person, repo } = this.props;

    return (
      <section className="infoPanel">

        {person ?
          <div className="infoPanel__container">
            <div className="infoPanel-basics">
              <img className="infoPanel-basics__picture" src={person.avatar_url}/>
              <h2 className="infoPanel-basics__login">/{person.login}</h2>
              {person.type === 'Organization'?
                <MdAccountBalance className="infoPanel-basics__icon"/>:
                <MdAccountCircle className="infoPanel-basics__icon"/>}
            </div>
            <div className="infoPanel-details">
              <h3>name: {person.name? person.name: 'N/A'}</h3>
              <h5>id: {person.id}</h5>
              <h5>location: {person.location ? person.location : 'N/A'}</h5>
              <h5>www: {person.blog? person.blog: 'N/A'}</h5>
              <h5>hireable: {person.hireable ? person.hireable : 'N/A'}</h5>
              <h5>repos: {person.public_repos ? person.public_repos : 'none'}</h5>
              <h5>gists: {person.public_gists ? person.public_gists : 'none'}</h5>
              <h5>followers: {person.followers ? person.followers : 'none'}</h5>
              <h5>following: {person.following ? person.following : 'none'}</h5>
            </div>
          </div>
          :
          <div className="infoPanel__container">
            <div className="infoPanel-basics">
              <GoRepo className="infoPanel-basics__picture"/>
              <h2 className="infoPanel-basics__login">/{repo.name}</h2>
            </div>
            <div className="infoPanel-details">
              <h3>full name: {repo.full_name ? repo.full_name: 'N/A'}</h3>
              <h5>id: {repo.id}</h5>
              <h5>status: {repo.private ? person.location : 'public'}</h5>
              <h5>www: {repo.homepage ? repo.homepage : 'N/A'}</h5>
              <h5>size: {repo.size}</h5>
              <h5>language: {repo.language ? repo.language : 'unknown'}</h5>
              <h5>gists: {repo.public_gists ? person.public_gists : 'none'}</h5>
              <h5>open issues: {repo.open_issues_count ? repo.open_issues_count : 'none'}</h5>
              <h5>subscribers: {repo.subscribers ? repo.subscribers : 'none'}</h5>
              <h5>description: {repo.description ? repo.description : 'none'}</h5>
            </div>
          </div>}


        {this.props.children}

      </section>
    );
  }
}

InfoPanel.PropTypes = {
};

export default InfoPanel;
