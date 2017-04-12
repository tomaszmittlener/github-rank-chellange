import React from 'react';

//icons
import MdAccountBalance from 'react-icons/lib/md/account-balance';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import MdFolder from 'react-icons/lib/md/folder';

class InfoPanel extends React.Component {
  constructor(){
    super();
  }

  render() {
    const RepoDetails = () => {
      let { repo } = this.props;
      return (
        <div className="infoPanel__container">
          <div className="infoPanel-basics">
            <MdFolder className="infoPanel-basics__picture"/>
            <h2 className="infoPanel-basics__login">/{repo.name}</h2>
          </div>
          <div className="infoPanel-details">
            <dl className="details__list">

              <dt className="title">full name:</dt>
              <dd className="description">
                {repo.full_name ?
                  repo.full_name
                  :
                  'N/A'}
              </dd>

              <dt className="title">id:</dt>
              <dd className="description">
                {repo.id}
              </dd>

              <dt className="title">status:</dt>
              <dd className="description">
                {repo.private ?
                  repo.location
                  :
                  'public'}
              </dd>

              <dt className="title">www:</dt>
              <dd className="description">
                {repo.homepage ? repo.homepage
                  :
                  'N/A'}
              </dd>

              <dt className="title">size:</dt>
              <dd className="description">
                {repo.size}
              </dd>

              <dt className="title">language:</dt>
              <dd className="description">
                {repo.language ? repo.language
                  :
                  'unknown'}
              </dd>
              <dt className="title">gists:</dt>
              <dd className="description">
                {repo.public_gists ? repo.public_gists
                  :
                  'none'}
              </dd>

              <dt className="title">open issues:</dt>
              <dd className="description">
                {repo.open_issues_count ?
                  repo.open_issues_count
                  :
                  'none'}
              </dd>

              <dt className="title">subscribers:</dt>
              <dd className="description">
                {repo.subscribers ?
                  repo.subscribers
                  :
                  'none'}
              </dd>

              <dt className="title">description:</dt>
              <dd className="description">
                {repo.description ?
                  repo.description
                  :
                  'none'}
              </dd>
            </dl>
          </div>
        </div>
      );
    };

    const PersonDetails = () => {
      let { person } = this.props;
      return (
        <div className="infoPanel__container">
          <div className="infoPanel-basics">
            <img className="infoPanel-basics__picture" src={person.avatar_url}/>
            <h2 className="infoPanel-basics__login">/{person.login}</h2>
            {person.type === 'Organization'?
              <MdAccountBalance className="infoPanel-basics__icon"/>:
              <MdAccountCircle className="infoPanel-basics__icon"/>}
          </div>
          <div className="infoPanel-details">
            <dl className="details__list">
              <dt className="title">name:</dt>
              <dd className="description">
                {person.name ?
                  person.name
                  :
                  'N/A'}
              </dd>

              <dt className="title">id:</dt>
              <dd className="description">
                {person.id}
              </dd>

              <dt className="title">location:</dt>
              <dd className="description">
                {person.location ?
                  person.location
                  :
                  'N/A'}
              </dd>

              <dt className="title">www:</dt>
              <dd className="description">
                {person.blog? person.blog
                  :
                  'N/A'}
              </dd>

              <dt className="title">repos:</dt>
              <dd className="description">
                {person.public_repos ?
                  person.public_repos
                  :
                  'none'}
              </dd>

              <dt className="title">gists:</dt>
              <dd className="description">
                {person.public_gists ?
                  person.public_gists
                  :
                  'none'}
              </dd>

              <dt className="title">followers:</dt>
              <dd className="description">
                {person.followers ?
                  person.followers
                  :
                  'none'}
              </dd>

              <dt className="title">following:</dt>
              <dd className="description">
                {person.following ?
                  person.following
                  :
                  'none'}
              </dd>
            </dl>
          </div>
        </div>
      );
    };

    return (
      <section className="infoPanel">
        {this.props.person ?
          <PersonDetails/>
          :
          <RepoDetails/> }
      </section>
    );
  }
}

InfoPanel.PropTypes = {
  person: React.PropTypes.object,
  repo: React.PropTypes.object
};

export default InfoPanel;
