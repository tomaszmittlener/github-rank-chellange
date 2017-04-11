import React from 'react';

class List extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="list">
        {this.props.children}
      </section>
    );
  }
}

List.PropTypes = {
};

export default List;
