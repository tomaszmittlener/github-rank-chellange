//react
import React from 'react';

class List extends React.Component {
  render() {
    return (
      <section className="list">
        {this.props.children}
      </section>
    );
  }
}


export default List;
