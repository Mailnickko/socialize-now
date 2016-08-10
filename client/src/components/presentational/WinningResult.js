import React, { Component } from 'react';
import '../../styles/css/temp.css';

class WinningResult extends Component {

  render() {
    const { winner } = this.props;
    return (
      <div>
        <div className="center">
          <h1>{ winner.locationName }</h1>
          <div><img alt={ winner.locationName } src={ winner.locationImg } /></div>
          <h2>{ winner.locationInfo }</h2>
        </div>
      </div>
    );
  }
};

export default WinningResult;
