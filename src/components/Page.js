import React from 'react';
import { Link } from 'react-router-dom'

import GoMarkGithub from 'react-icons/lib/go/mark-github'

class Page extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="page">

        <nav className="page__nav">
            <Link className="link" to="/"><GoMarkGithub className="nav-logo"/></Link>
            <div className="nav-status">
              <h3>{this.props.status}</h3>
            </div>
        </nav>
        <div className="page__container">
          {this.props.children}
        </div>

      </section>
    );
  }
}

Page.PropTypes = {
};

export default Page;
