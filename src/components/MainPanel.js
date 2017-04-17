//react
import React from 'react';

class RightPanel extends React.Component {
  render() {
    return (
      <section className="mainPanel">
          {this.props.children}
      </section>
    );
  }
}


export default RightPanel;
