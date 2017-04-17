import React from 'react';

class PageTitle extends React.Component {
  render() {
    return (
      <h2 className='page-title'>
        {this.props.children}
      </h2>
    );
  }
}


export default PageTitle;
