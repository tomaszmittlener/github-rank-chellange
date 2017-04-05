import React from 'react';

class Page extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="page">
        {this.props.children}
      </section>
    );
  }
}

Page.defaultProps = {
};

export default Page;
