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
          <div className="nav-items">
            <Link className="link" to="/"><GoMarkGithub className="nav-item__logo"/></Link>
          </div>
        </nav>
        <div className="page__container">
          {this.props.children}
        </div>


      </section>
    );
  }
}

Page.defaultProps = {
};

export default Page;
