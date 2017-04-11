import React from 'react';

class RightPanel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="rightPanel">
          {this.props.children}
      </section>
    );
  }
}

RightPanel.PropTypes = {
};

export default RightPanel;
