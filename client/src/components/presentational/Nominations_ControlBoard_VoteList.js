import React, { Component } from 'react';
import '../../styles/css/temp.css';

class VoteList extends Component {

  render() {
    const { suggestion } = this.props;
    return (
      <div>
        <div>{ suggestion.locationName }</div>
        <div>Vote Count</div>
      </div>
    );
  }
};

export default VoteList;
