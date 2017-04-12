import React from 'react';
import { Link } from 'react-router-dom'

//icons
import GoMarkGithub from 'react-icons/lib/go/mark-github'

class Page extends React.Component {

  render() {
    return (
      <section className="page">
        <nav className="page__nav">
          <Link className="nav-logo link"
                to="/">
            <GoMarkGithub className="nav-logo__icon"/>
          </Link>

          <h4 className="nav-title">
            {this.props.pageTitle}
          </h4>
        </nav>

        <div className="page__container">
          {this.props.children}
        </div>

      </section>
    );
  }
}

export default Page;
