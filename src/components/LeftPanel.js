import React from 'react';

class LeftPanel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="leftPanel">
          {this.props.children}

      </section>
    );
  }
}

LeftPanel.defaultProps = {
};

export default LeftPanel;
