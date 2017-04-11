import React from 'react';

class LeftPanel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="leftPanel">
        <img className="leftPanel__image" src={this.props.image}/>

        <div className="leftPanel__details">
          <h2>{this.props.title}</h2>
          <h3>{this.props.type}</h3>
        </div>

          {this.props.children}

      </section>
    );
  }
}

LeftPanel.PropTypes = {
};

export default LeftPanel;
